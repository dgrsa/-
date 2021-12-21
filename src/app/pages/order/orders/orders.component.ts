import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  currentOrders = [];
  orders = [];
  counter;
  pCounter;
  offset = 1;
  pOffset = 1;
  page;
  pPage;
  ImageBaseUrl = environment.imageBaseUrl;
  status = [
    'paid',
    'finished',
    'on_table',
    'in_kitchen',
    'prepared',
    'preparing',
    'pending',
  ];
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private coockieService: CookieService,
    private router: Router,
    private messagingService: MessagingService
  ) {
    this.messagingService.changeEmitted$.subscribe(data => {
      if (router.url == '/order/history') {
        if (data['data']['status'] == 'paid') {
          const index = this.orders.findIndex(x => x.id == data['data']['id']);
          this.orders[index]['status'] = data['data']['status'];
        } else {
          const index = this.currentOrders.findIndex(x => x.id == data['data']['id']);
          this.currentOrders[index]['status'] = data['data']['status'];
        }
      }
    })
  }

  ngOnInit(): void {
    this.getCurrentOrders();
    this.getOrders();
  }

  getCurrentOrders(): void {
    this.spinner.show();
    this.authService
      .getOrders(
        this.offset - 1,
        this.status.slice(1),
        undefined,
        this.cookieService.get('BuserId')
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          if (data['success']) {
            this.counter = data['count'];
            this.currentOrders = data['data']['rows'];
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }

  getOrders(): void {
    this.spinner.show();
    this.authService
      .getOrders(
        this.pOffset - 1,
        this.status[0],
        undefined,
        this.cookieService.get('BuserId')
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          if (data['success']) {
            this.pCounter = data['count'];
            this.orders = data['data']['rows'];
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }

  loadMore(event, type = 'current'): void {
    if ((type = 'current')) {
      this.offset = event;
      this.page = event;
      this.getCurrentOrders();
    } else {
      this.pOffset = event;
      this.pPage = event;
      this.getOrders();
    }
  }

  payOnline(orderId): void {
    this.authService
      .payOnline(this.coockieService.get('BuserId'), orderId)
      .subscribe(
        (data) => {
          if (data['success']) {
            const paymentUrl = data['data']['paymentURL'];
            window.location.href = `${paymentUrl}`;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
