import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { ResturantComponent } from './resturant.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: 'meal-details/:id', component: MealDetailsComponent },
  { path: '', component: ResturantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResturantRoutingModule {}
