import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, PasswordRoutingModule, TranslateModule.forChild()],
})
export class PasswordModule {}
