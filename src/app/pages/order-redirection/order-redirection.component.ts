import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';

@Component({
  selector: 'app-order-redirection',
  templateUrl: './order-redirection.component.html',
  styleUrls: ['./order-redirection.component.scss'],
})
export class OrderRedirectionComponent implements OnInit {
  status;
  counter$: Observable<number>;
  count = 6;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private helperTool: HelperToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      this.checkPaymentStatus(parseInt(params['orderId']));
    });

    // this.counter$ = timer(0, 1000).pipe(
    //   take(this.count),
    //   map(() => --this.count)
    // );
  }

  ngOnInit(): void {}

  checkPaymentStatus(orderId): void {
    this.authService
      .chackPaymentStatus(this.cookieService.get('BuserId'), orderId)
      .subscribe(
        (data) => {
          if (data['success']) {
            this.status = data['data']['status'];
            // {
            //   setInterval(() => {
            //     this.addCounterDown();
            //   }, 1000);
            // }
          }
        },
        (err) => {
          this.helperTool.showAlertWithTranslation(
            '',
            'Somthing wrong happend',
            'error'
          );
        }
      );
  }

  // addCounterDown() {
  //   if (this.count != 0) {
  //     this.count--;
  //   } else if (this.count == 0) {
  //     this.router.navigate(['/order/history']);
  //   }
  // }
}
