import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, TranslateModule.forChild()],
})
export class CartModule {}
