import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public config: ConfigRequestData = {
    username: "",
    email: "",
    full_name: "",
    local: 0
  };

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getInfo() 
  }

  getInfo() {
    let user = this.authService.userDetail;
    this.httpService.get<ConfigRequestData>('/users/me/', {headers:{'bearer-token':user.access_token}})
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.config = response;
        }
      });
  }
}
export interface ConfigRequestData {
  username: string;
  email: string;
  full_name: string;
  local: number
}