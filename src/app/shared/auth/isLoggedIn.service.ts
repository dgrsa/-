import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
// import { HelperToolsService } from './helper-tools.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class isLoggedIn {
  userData = {} as any;
  userId;
  newToken;
  constructor(
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.userId = this.cookieService.get('BuserId');
    this.auth.tokenChangeEmitted$.subscribe((token) => {
      this.newToken = token;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      let token = this.cookieService.get('Btoken') || this.newToken;
      if (token) {
        this.router.navigate(['/']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
