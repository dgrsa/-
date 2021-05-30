import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRedirectionRoutingModule } from './order-redirection-routing.module';
import { OrderRedirectionComponent } from './order-redirection.component';


@NgModule({
  declarations: [OrderRedirectionComponent],
  imports: [
    CommonModule,
    OrderRedirectionRoutingModule
  ]
})
export class OrderRedirectionModule { }
