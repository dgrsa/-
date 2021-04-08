import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: 'meal-details', component: MealDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResturantRoutingModule {}
