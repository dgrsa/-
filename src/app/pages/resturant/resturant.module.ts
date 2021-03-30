import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantRoutingModule } from './resturant-routing.module';
import { DetailsComponent } from './details/details.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DetailsComponent, MealDetailsComponent],
  imports: [
    CommonModule,
    ResturantRoutingModule,
    SwiperModule,
    TranslateModule.forChild(),
  ],
})
export class ResturantModule {}
