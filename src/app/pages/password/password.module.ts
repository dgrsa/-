import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule
  ]
})
export class PasswordModule { }
