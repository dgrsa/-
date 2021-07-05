import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { ResturantService } from 'src/app/shared/services/resturant.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  methods = [];
  public orderForm = new FormGroup({
    payment_id: new FormControl('', Validators.required),
    notes: new FormControl(''),
  });
  orderData = {} as any;
  imageBaseUrl = environment.imageBaseUrl;
  cartData = {} as any;
  mealsData = [];
  tableNumber;
  tableId;
  resturantId;
  constructor(
    private spinner: NgxSpinnerService,
    private resturantService: ResturantService,
    private coockieService: CookieService,
    private validateForm: ValidateFormService,
    private authService: AuthService,
    private helperTool: HelperToolsService,
    private cartService: CartService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.tableId =
      this.cartService.tableId || this.coockieService.get('tableId');
    this.tableNumber =
      this.cartService.tableNumber || this.coockieService.get('tableNumber');
    this.resturantId =
      this.cartService.resturantId || this.coockieService.get('resturantId');
    this.mealsData = this.cartService.CartData['mealsData'];
    this.cartData = this.cartService.CartData;
    this.orderForm.patchValue(cartService.orderData);
  }

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  getPaymentMethods(): void {
    this.spinner.show();
    this.resturantService
      .getResturantById(this.mealsData[0].resturant_id)
      .subscribe(
        (data) => {
          if (data['success']) {
            this.methods = data['data']['payments'];
            this.spinner.hide();
          }
        },
        (err) => {
          console.error(err);
          this.spinner.hide();
        }
      );
  }

  createOrder(): void {
    this.spinner.show();
    const meals = this.cartData.meals.map((product) => ({
      options: product.options.map((option) => {
        return option.id;
      }),
      productId: product.id,
      quantity: product.quantity,
    }));
    this.orderData['products'] = meals;
    this.orderData['payment_id'] = this.orderForm.value.payment_id;
    this.orderData['resturant_id'] = this.mealsData[0].resturant_id;
    this.authService
      .createOrder(this.orderData, this.coockieService.get('BuserId'))
      .subscribe(
        (data) => {
          this.spinner.hide();
          if (data['success']) {
            this.helperTool.showAlertWithTranslation(
              '',
              'This order hass been created',
              'success'
            );
            environment.userCart = {
              totalPrice: 0,
              totalQuantity: 0,
              totalItems: 0,
              meals: [],
              mealsData: [],
            };
            this.cartService.emitChange(0);
            localStorage.setItem(
              'BrodoneCart',
              JSON.stringify(environment.userCart)
            );
            if (this.orderForm.value.payment_id == 3) {
              this.payOnline(data['data']['id']);
            } else {
              this.router.navigate(['/order/history']);
            }
            // this.helperTool
            //   .showConfirmAlert('Order completed', 'Do you want to pay now?')
            //   .then((__) => {
            //     this.payOnline(data['data']['id']);
            //   })
            //   .catch((err) => {
            //     this.router.navigate(['/order/history']);
            //   });
          } else {
            this.helperTool.showAlertWithTranslation(
              '',
              'Somthing wrong happend',
              'error'
            );
          }
        },
        (err) => {
          this.spinner.hide();
          this.helperTool.showAlertWithTranslation(
            '',
            'Somthing wrong happend',
            'error'
          );
        }
      );
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
          this.helperTool.showAlertWithTranslation(
            '',
            'Somthing wrong happend',
            'error'
          );
          console.error(err);
        }
      );
  }

  validateOrderForm(): void {
    if (this.orderForm.valid) {
      if (
        this.tableNumber &&
        this.mealsData[0].resturant_id == this.coockieService.get('resturantId')
      ) {
        this.orderData.tableNumber = parseInt(this.tableNumber);
        this.createOrder();
      } else {
        this.helperTool
          .showConfirmAlert(
            '',
            'You are ordering from one restaurant and this table belongs to another restaurant, or you have not chosen the table yet. Please scan the correct code'
          )
          .then((__) => {
            this.router.navigate(['/scan-code'], {
              queryParams: { checkout: 1 },
            });
            this.cartService.orderData = this.orderForm.value;
          })
          .catch((err) => {
            // UserCanceld
          });
      }
    } else {
      this.validateForm.validateAllFormFields(this.orderForm);
    }
  }
}
