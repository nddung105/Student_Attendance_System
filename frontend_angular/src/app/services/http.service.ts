import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  constructor(protected router: Router,
              protected http: HttpClient,
              @Inject('BASE_URL') protected baseUrl: string,
              @Inject('API_URL') protected apiUrl: string
  ) {
    this.baseUrl = Config.server;
  }

  // todo viet lai ham duoi dung asyn method
  get<T>(route: string, httpOptions?: object): Observable<T> {
    return this.http.get<T>(this.baseUrl + route, httpOptions);
  }
  post<T>(route: string, data: any, httpOptions?: object): Observable<T>
  {
    return this.http.post<T>(this.baseUrl + route, data, httpOptions);
  }
  delete<T>(route: string, id: number, httpOptions?: object): Observable<T> {
    const url = `${route}/${id}`; // DELETE id
    return this.http.delete<T>(this.baseUrl + url, httpOptions);
  }
  put<T>(route: string, data: any, httpOptions?: object): Observable<T> {
    return this.http.put<T>(this.baseUrl + route, data, httpOptions);
  }
}