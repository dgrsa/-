import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrdersComponent } from './orders/orders.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [OrderTrackingComponent, OrdersComponent],
  imports: [CommonModule, OrderRoutingModule, TabsModule.forRoot()],
})
export class OrderModule {}
