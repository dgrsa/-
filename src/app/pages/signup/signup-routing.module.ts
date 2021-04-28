import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'create-password', component: CreatePasswordComponent },
  { path: 'confirm-code', component: ConfirmCodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
