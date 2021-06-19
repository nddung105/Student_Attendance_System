import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService, UserDetail} from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const userDetail: UserDetail = this.authService.userDetail;
    if (userDetail && userDetail.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userDetail.access_token}`
        }
      });
    }
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return next.handle(request);
  }
}
