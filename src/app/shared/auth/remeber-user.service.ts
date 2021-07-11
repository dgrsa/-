// import { MessagingService } from './messaging.service';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  ActivatedRoute,
  Router,
  NavigationStart,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessagingService } from '../services/messaging.service';

@Injectable({
  providedIn: 'root',
})
export class RemeberUserService implements CanActivate {
  userId;
  message;
  newToken;
  token;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private messagingService: MessagingService
  ) {
    this.userId = this.cookieService.get('BuserId');
    this.authService.tokenChangeEmitted$.subscribe((token) => {
      this.newToken = token;
    });
    this.token = this.cookieService.get('Btoken') || this.newToken;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.token) {
        resolve(true);
      }
      if (this.userId) {
        this.authService.getUserdata(this.userId).subscribe(
          (data) => {
            if (data['success']) {
              environment.userInfo = data['data'];
              this.authService.emitChange({
                name: 'user_login',
                user_data: data['data'],
              });
              // this.messagingService.getPermission(
              //   this.cookieService.get('BuserId'),
              //   this.token
              // );
              // this.messagingService.receiveMessage();
              // this.message = this.messagingService.currentMessage;
              resolve(true);
            } else {
              resolve(true);
            }
          },
          (err) => {
            console.log(err);
            resolve(true);
          }
        );
      }
    });
  }
}
