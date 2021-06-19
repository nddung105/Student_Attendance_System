import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserDetail, AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private httpService: HttpService, private authService: AuthService) { }
  getCameras(): Observable<any> {
    return new Observable<any>((observer) => {
      let user = this.authService.userDetail;
      this.httpService.get<any>('/subjects',  {headers:{'bearer-token':user.access_token}})
        .subscribe(data => {
            if (data) {
              observer.next(data);
            }
          },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }
  getLesson(id): Observable<any> {
    return new Observable<any>((observer) => {
      let user = this.authService.userDetail;
      this.httpService.get<any>('/subject/'+id,  {headers:{'bearer-token':user.access_token}})
        .subscribe(data => {
            if (data) {
              observer.next(data);
            }
          },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }
  getAttendance(id): Observable<any> {
    return new Observable<any>((observer) => {
      let user = this.authService.userDetail;
      this.httpService.get<any>('/get-attendance?shift_id='+id,  {headers:{'bearer-token':user.access_token}})
        .subscribe(data => {
            if (data) {
              observer.next(data);
            }
          },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }
}
