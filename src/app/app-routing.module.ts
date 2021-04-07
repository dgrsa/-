import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
import { isLoggedIn } from './shared/auth/isLoggedIn.service';
import { RemeberUserService } from './shared/auth/remeber-user.service';

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((mod) => mod.SignupModule),
    canActivate: [isLoggedIn],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
    canActivate: [isLoggedIn],
  },
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/home/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./pages/home/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('./pages/password/password.module').then(
            (mod) => mod.PasswordModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then(
            (mod) => mod.ProfileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'resturant',
        loadChildren: () =>
          import('./pages/resturant/resturant.module').then(
            (mod) => mod.ResturantModule
          ),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./pages/order/order.module').then((mod) => mod.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./pages/about-us/about-us.module').then(
            (mod) => mod.AboutUsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [RemeberUserService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
