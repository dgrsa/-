import { CookieService } from 'ngx-cookie-service';
import { HelperToolsService } from '../../shared/services/helper-tools.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  userData = {} as any;
  userId;
  user: any;
  newToken;
  token;
  constructor(
    private auth: AuthService,
    private router: Router,
    private helperTool: HelperToolsService,
    private cookieService: CookieService
  ) {
    this.userId = this.cookieService.get('BuserId');
    this.auth.tokenChangeEmitted$.subscribe((token) => {
      this.newToken = token;
    });
    this.token = this.cookieService.get('Btoken') || this.newToken;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.token) {
        this.auth.emitChange(this.user);
        this.router.navigate(['/']);
        this.helperTool.showAlertWithTranslation(
          '',
          'This session has been expired. Please, Login agian',
          'error'
        );
        resolve(false);
      } else {
        this.auth.getUserdata(this.userId).subscribe(
          (data) => {
            if (data['success']) {
              this.auth.emitChange(this.userData);
              environment.userInfo = data['data']['user'];
              resolve(true);
            }
          },
          (err) => {
            console.log(err);
            resolve(false);
          }
        );
      }
    });
  }
}
