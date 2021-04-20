import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrdersComponent } from './orders/orders.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderTrackingComponent, OrdersComponent, CheckoutComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    TabsModule.forRoot(),
    TranslateModule.forChild(),
    ReactiveFormsModule,
  ],
})
export class OrderModule {}
