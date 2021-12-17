import { CookieService } from 'ngx-cookie-service';
import { HelperToolsService } from '../services/helper-tools.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResturantGuard {
  constructor(
    private router: Router,
    private helperTool: HelperToolsService,
    private cookieService: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      if (this.cookieService.get('tableNumber')) {
        if (
          state.url.includes('/resturant/details') &&
          (state.url.split('details/')[1] ==
            this.cookieService.get('resturantId') ||
            state.url.split('details/')[1].split('?')[0] ==
              this.cookieService.get('resturantId'))
        ) {
          resolve(true);
        } else {
          this.router.navigate([
            '/resturant/details/' + this.cookieService.get('resturantId'),
          ]);
          resolve(false);
        }
      } else {
        resolve(true);
      }
    });
  }
}
