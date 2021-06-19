import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService,
              private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLoggedInToPrevent(url, state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  /**
   * @description
   *
   * A function to check that user is login to prevent access login page again
   *@return true if user is not logged in, false otherwise and redirect to dashboard
   */
  checkLoggedInToPrevent(url: string, state?: RouterStateSnapshot): boolean {
    // TODO: chinh lai ham duoi de tra ve
    if (this.authService.userDetail?.access_token) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
