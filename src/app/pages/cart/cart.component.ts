import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  meal_data = [];
  cart_data = {} as any;
  orderData = {} as any;
  imageBaseURL = environment.imageBaseUrl;
  constructor(
    private cartService: CartService,
    public translate: TranslateService,
    private router: Router,
    private helperTool: HelperToolsService
  ) {
    this.meal_data = this.cartService.CartData['mealsData'];
    this.cart_data = this.cartService.CartData;
  }

  ngOnInit(): void {}

  deleteCatrItem(index) {
    this.cartService.onDeleteCliced(index);
  }

  onChangeQuantity(Data, value, i) {
    if (value == -1) {
      Data.quantity += value;
      Data.price = Data.quantity * this.meal_data[i].price;
      this.cartService.UpdateCart();
    } else if (value == 1) {
      Data.quantity += value;
      Data.price = Data.quantity * this.meal_data[i].price;
      this.cartService.UpdateCart();
    }
  }

  goToCheckout(): void {
    if (environment.userInfo['id']) {
      this.router.navigate(['/order/checkout']);
    } else {
      this.router.navigate(['/login'], { queryParams: { cartlogin: '1' } });
      this.helperTool.showAlertWithTranslation(
        '',
        'Please login to be able to complete the order',
        'error'
      );
    }
  }
}
