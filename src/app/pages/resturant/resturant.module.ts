import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantRoutingModule } from './resturant-routing.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    ResturantRoutingModule
  ]
})
export class ResturantModule { }
