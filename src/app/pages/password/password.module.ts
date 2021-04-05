import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
  ],
})
export class PasswordModule {}
