import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
import { isLoggedIn } from './shared/auth/isLoggedIn.service';
import { RemeberUserService } from './shared/auth/remeber-user.service';
import { ResturantGuard } from './shared/auth/resturant.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PrivacyComponent } from './shared/components/privacy/privacy.component';
import { ScanCodeComponent } from './shared/components/scan-code/scan-code.component';
import { TermsConditionsComponent } from './shared/components/terms-conditions/terms-conditions.component';

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
        canActivate: [ResturantGuard],
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
        path: 'notifications',
        loadChildren: () =>
          import('./pages/notifications/notifications.module').then(
            (mod) => mod.NotificationsModule
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
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart/cart.module').then((mod) => mod.CartModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/order-redirection/order-redirection.module').then(
            (mod) => mod.OrderRedirectionModule
          ),
      },
      { path: 'scan-code', component: ScanCodeComponent },
      { path: 'privacy-policy', component: PrivacyComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: '/not-found' },
    ],
    canActivate: [RemeberUserService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
