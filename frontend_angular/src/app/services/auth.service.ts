import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:max-line-length
  // There are two properties exposed by the authentication service for accessing the currently logged in user. The currentUser observable can be used when you want a component to reactively update when a user logs in or out, for example in the app.component.ts so it can show/hide the main nav bar when the user logs in/out. The currentUserValue property can be used when you just want to get the current value of the logged in user but don't need to reactively update when it changes, for example in the auth.guard.ts which restricts access to routes by checking if the user is currently logged in.
  private _userDetail: BehaviorSubject<UserDetail>;
  private _currentUser: Observable<UserDetail>;
  // goi ham duoi de tra ve thong tin nguoi dung hien tai
  get userDetail(): UserDetail { return this._userDetail.value; }
  // goi ham duoi de tra ve thong tin nguoi dung realtime, khi dang xuat thi tu dong view lay du lieu tu day se auto cap nhat
  get currentUser(): Observable<UserDetail> { return this._currentUser; }

  constructor(private httpService: HttpService
  ) {
    this._userDetail = new BehaviorSubject<UserDetail>(JSON.parse(localStorage.getItem('currentUser')));
    this._currentUser = this._userDetail.asObservable();
  }

  // authLogin(): Observable<AuthStatus> {
  //   return of(this.authStatus);
  //  .pipe(
  //  delay(2000),
  //  tap()
  // );
  // }

  login(data: User): Observable<string> {
    return new Observable<string>((observer) => {
      this.httpService.post<UserDetail>('/token', '', {
        params: {username: data.username, userpass: data.userpass}
      })
        .subscribe((detail: UserDetail) => {
          if (!(detail?.access_token)) {
            observer.next('ERROR_NAME_OR_PASS');

          } else {
            this._userDetail = new BehaviorSubject<UserDetail>(detail);
            localStorage.setItem('currentUser', JSON.stringify(detail));
            this._userDetail.next(detail);
            observer.next('SUCCESS');
          }
        },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this._userDetail.next(null);
  }



}
export interface UserDetail {
  id: number;
  username: string;
  fullName: string;
  access_token: string;
  roles: Object;
}
