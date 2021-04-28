import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

@NgModule({
  declarations: [SignupComponent, CreatePasswordComponent, ConfirmCodeComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignupModule {}
