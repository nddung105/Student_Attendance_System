import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  public user: User = {
    username: '',
    email: '',
    full_name: '',
    local: 0,
    password: ''
  };
  constructor(private route: Router,
    private authService: AuthService) { }

}
export interface User {
  username: string;
  email: string;
  full_name: string;
  local: number;
  password: string

}