import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResturantGuard } from 'src/app/shared/auth/resturant.guard';
import { DetailsComponent } from './details/details.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { ResturantComponent } from './resturant.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [ResturantGuard],
  },
  { path: 'meal-details/:id', component: MealDetailsComponent },
  { path: '', component: ResturantComponent, canActivate: [ResturantGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResturantRoutingModule {}
