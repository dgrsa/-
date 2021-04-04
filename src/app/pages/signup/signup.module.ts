import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreatePasswordComponent } from './create-password/create-password.component';

@NgModule({
  declarations: [SignupComponent, CreatePasswordComponent],
  imports: [CommonModule, SignupRoutingModule, TranslateModule.forChild()],
})
export class SignupModule {}
