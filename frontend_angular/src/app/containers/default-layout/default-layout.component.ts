import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  constructor(private httpService: HttpService) { }

  public sidebarMinimized = false;
  public navItems = navItems;
  
  public data : Version;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
  }
}

export interface Version{
  version : string;
  date_update : string;
}