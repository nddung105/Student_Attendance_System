import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PdByPicService {

  constructor(
    private httpService: HttpService
    ) { }
}
