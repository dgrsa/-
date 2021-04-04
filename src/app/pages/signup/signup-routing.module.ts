import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'create-password', component: CreatePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
