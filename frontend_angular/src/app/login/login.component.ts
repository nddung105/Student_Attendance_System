import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: string;
  public loading = false;
  public user: User = {
    username: '',
    userpass: ''
  };
  constructor(private authService: AuthService,
              private router: ActivatedRoute,
              private route: Router
  ) {
  }

  login(user: User) {
    this.message = null;
    this.loading = true;
    const userData: User = {
      username: user.username,
      userpass: user.userpass
    }
    this.authService.login(userData).subscribe(result => {
        if (result === 'SUCCESS') {
          // get return url from route parameters or default to '/'
          // const returnUrl: string = this.router.snapshot.queryParams['returnUrl'] || '/dashboard';
          const returnUrl: string = '/dashboard';
          this.route.navigate([returnUrl]);
        } else if (result === 'ERROR_NAME_OR_PASS') {
          this.message = 'Sai tên đăng nhập hoặc mật khẩu';
          this.loading = false;
          // todo in thong bao sai ten dn
        }
      },
      (message) => {
        // todo in thong bao dang nhap loi
        this.message = 'Có lỗi trong quá trình đăng nhập!';
        this.loading = false;
      }
    );
  }
  ngOnInit(): void {
  }

}
export interface User {
  username: string;
  userpass: string;
}
