import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantRoutingModule } from './resturant-routing.module';
import { DetailsComponent } from './details/details.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, ResturantRoutingModule, SwiperModule],
})
export class ResturantModule {}
