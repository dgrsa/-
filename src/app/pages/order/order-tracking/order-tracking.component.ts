import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent implements OnInit {
  modalRef: BsModalRef;
  orderData = {} as any;
  items = [];
  ImageBaseUrl = environment.imageBaseUrl;
  constructor(
    private modalService: BsModalService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.getOrders(params['id']);
    });
  }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getOrders(orderId): void {
    this.spinner.show();
    this.authService
      .getOrders(
        undefined,
        undefined,
        orderId,
        this.cookieService.get('BuserId')
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          if (data['success']) {
            this.orderData = data['data']['rows'][0];
            this.items = this.orderData.items;
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }
}
