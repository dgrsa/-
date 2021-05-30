import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderRedirectionComponent } from './order-redirection.component';

const routes: Routes = [{ path: 'myfatoorah/callback', component: OrderRedirectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRedirectionRoutingModule {}
