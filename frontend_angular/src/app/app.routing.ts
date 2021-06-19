import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {LoggedinGuard} from './guards/loggedin.guard';
import {LogoutComponent} from './login/logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedinGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Logout'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        pathMatch: 'prefix',
        canLoad: [AuthenticationGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'camera',
        pathMatch: 'prefix',
        canLoad: [AuthenticationGuard],
        loadChildren: () => import('./views/camera/camera.module').then(m => m.CameraModule)
      },
      {
        path: 'config',
        pathMatch: 'prefix',
        canLoad: [AuthenticationGuard],
        loadChildren: () => import('./views/config/config.module').then(m => m.ConfigModule)
      },
      {
        path: 'update',
        pathMatch: 'prefix',
        canLoad: [AuthenticationGuard],
        loadChildren: () => import('./views/update/update.module').then(m => m.UpdateModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
