import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public passwordForm = new FormGroup({
    passwordResetToken: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private authService: AuthService,
    private helperTool: HelperToolsService,
    private router: Router,
    private validForm: ValidateFormService
  ) {}

  ngOnInit(): void {}

  resetPassword() {
    if (this.passwordForm.valid) {
      this.spinner.show();
      const sentData = this.passwordForm.value;
      sentData['email'] = this.cookieService.get('userEmail');
      this.authService.resetPassword(sentData).subscribe(
        (data) => {
          if (data['success']) {
            // console.log(data);
            this.helperTool.showAlertWithTranslation(
              '',
              'Password reset',
              'success'
            );
            this.spinner.hide();
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
          if (
            err['error']['message'] == 'controller.changePassword.invalidToken'
          ) {
            this.helperTool.showAlertWithTranslation(
              '',
              'Code is incorrect',
              'error'
            );
          }
        }
      );
    } else {
      this.validForm.validateAllFormFields(this.passwordForm);
    }
  }
}
