import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantRoutingModule } from './resturant-routing.module';
import { DetailsComponent } from './details/details.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResturantComponent } from './resturant.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [DetailsComponent, MealDetailsComponent, ResturantComponent],
  imports: [
    CommonModule,
    ResturantRoutingModule,
    SwiperModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class ResturantModule {}
