import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'tracking', component: OrderTrackingComponent },
  { path: 'history', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
