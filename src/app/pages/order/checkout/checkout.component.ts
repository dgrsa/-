import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/shared/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  methods = [];
  imageBaseUrl = environment.imageBaseUrl;
  constructor(
    private spinner: NgxSpinnerService,
    private generalService: GeneralService,
    private coockieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  getPaymentMethods(): void {
    this.spinner.show();
    this.generalService.getPayments(undefined).subscribe(
      (data) => {
        if (data['success']) {
          this.methods = data['data']['rows'];
          this.spinner.hide();
        }
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }
}
