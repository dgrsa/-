import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperToolsService } from './helper-tools.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartChangeSource = new Subject<any>();
  CartData = {} as any;
  changeEmitted$ = this.cartChangeSource.asObservable();
  constructor(private helperTools: HelperToolsService) {
    this.getCartItems();
    this.UpdateCart();
  }

  emitChange(change: any) {
    this.cartChangeSource.next(change);
  }

  addToCart(meal) {
    let final = {} as any;
    let totalPrice = 0;
    let totalQuantity = 0;
    if (environment.userCart.meals.length >= 1) {
      for (let i = 0; i < environment.userCart.meals.length; i++) {
        const element = environment.userCart.meals[i];
        if (element.id == meal.id) {
          element.quantity = element.quantity + meal['selectedQuantity'];
          element.price = element.quantity * meal.price;
          environment.userCart.meals.map((meal) => {
            totalPrice = totalPrice + meal.price;
            totalQuantity = totalQuantity + meal.quantity;
          });
          environment.userCart.totalPrice = totalPrice;
          environment.userCart.totalQuantity = totalQuantity;
          localStorage.setItem(
            'BrodoneCart',
            JSON.stringify(environment.userCart)
          );
          this.emitChange(this.CartData['totalItems']);
          this.helperTools.showAlertWithTranslation(
            '',
            'This meal has been updated',
            'success'
          );
          meal['selectedQuantity'] = 1;
          break;
        } else if (i + 1 != environment.userCart.meals.length) {
          continue;
        } else {
          final.id = meal.id;
          final.quantity = meal['selectedQuantity'];
          final.price = meal['selectedQuantity'] * meal.price;
          final.productId = meal.productId;
          environment.userCart.meals.push(final);
          environment.userCart.mealsData.push(meal);
          environment.userCart.totalItems = environment.userCart.meals.length;
          environment.userCart.meals.map((meal) => {
            totalPrice = totalPrice + meal.price;
            totalQuantity = totalQuantity + meal.quantity;
          });
          environment.userCart.totalPrice = totalPrice;
          environment.userCart.totalQuantity = totalQuantity;
          localStorage.setItem(
            'BrodoneCart',
            JSON.stringify(environment.userCart)
          );
          this.emitChange(this.CartData['totalItems']);
          this.helperTools.showAlertWithTranslation(
            '',
            'Cart has been updated',
            'success'
          );
          meal['selectedQuantity'] = 1;
          break;
        }
      }
    } else if (environment.userCart.meals.length == 0) {
      final.id = meal.id;
      final.quantity = meal['selectedQuantity'];
      final.price = meal['selectedQuantity'] * meal.price;
      environment.userCart.meals.push(final);
      environment.userCart.mealsData.push(meal);
      environment.userCart.totalItems = environment.userCart.meals.length;
      environment.userCart.meals.map((meal) => {
        totalPrice = totalPrice + meal.price;
        totalQuantity = totalQuantity + meal.quantity;
      });
      environment.userCart.totalPrice = totalPrice;
      environment.userCart.totalQuantity = totalQuantity;
      localStorage.setItem('BrodoneCart', JSON.stringify(environment.userCart));
      this.emitChange(this.CartData['totalItems']);
      this.helperTools.showAlertWithTranslation(
        '',
        'This meal added to cart',
        'success'
      );
      meal['selectedQuantity'] = 1;
    }
  }

  getCartItems(): void {
    if (environment.userCart) {
      const BrodoneCart = JSON.parse(localStorage.getItem('BrodoneCart'));
      if (BrodoneCart) {
        this.CartData = BrodoneCart;
        this.UpdateCart();
        return;
      }
    }
    this.CartData = environment.userCart;
    if (environment.userCart['totalItems'] == 0) {
      this.emitChange(0);
    }
    // console.log(this.CartData);
  }

  UpdateCart() {
    let totalPrice = 0;
    const totalItems = this.CartData['meals'].length;
    let totalQuantity = 0;
    if (this.CartData['meals'].length == 0) {
      this.CartData = environment.userCart;
      localStorage.setItem('BrodoneCart', JSON.stringify(this.CartData));
    }
    environment.userCart.meals.map((meal) => {
      totalPrice = totalPrice + meal.price;
      totalQuantity = totalQuantity + meal.quantity;
    });
    this.CartData['totalItems'] = totalItems;
    this.CartData['totalPrice'] = totalPrice;
    this.CartData['totalQuantity'] = totalQuantity;
    environment.userCart = this.CartData;
    // console.log(this.CartData);
    localStorage.setItem('BrodoneCart', JSON.stringify(this.CartData));
  }
}
