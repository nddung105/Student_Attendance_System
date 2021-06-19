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
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    let url;
    for (const us of segments) {
      url += us.path + '/';
    }
    return this.checkLoginToRequire(url);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    const url: string = state.url;

    return this.checkLoginToRequire(url);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  /**
   * @description
   *
   * A function to check that user is login or not
   *@return true if user is logged in, false otherwise and redirect to login page
   * with return Url for user to continue after login successfully
   */
  checkLoginToRequire(url?: string): boolean {
    if (this.authService.userDetail?.access_token) { return true; }
    // Store the attempted URL for redirecting
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': sessionId },
    //   fragment: 'anchor'
    // };
    // Navigate to the login page with extras
    this.router.navigate(['/login'], { queryParams: { returnUrl: url ? url : '' }}
      // , navigationExtras
    );
    return false;
  }

}
