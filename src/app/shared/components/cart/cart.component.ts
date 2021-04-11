import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  meal_data = [];
  cart_data = {} as any;
  imageBaseURL = environment.imageBaseUrl;
  constructor(
    public bsModalRef: BsModalRef,
    private cartService: CartService,
    public translate: TranslateService
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
}
