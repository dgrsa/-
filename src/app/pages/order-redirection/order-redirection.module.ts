import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRedirectionRoutingModule } from './order-redirection-routing.module';
import { OrderRedirectionComponent } from './order-redirection.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [OrderRedirectionComponent],
  imports: [CommonModule, OrderRedirectionRoutingModule, TranslateModule],
})
export class OrderRedirectionModule {}
