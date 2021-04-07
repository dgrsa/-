import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public mainInfoForm = new FormGroup({
    phone: new FormControl({ value: '', disabled: true }),
    name: new FormControl(),
    email: new FormControl([Validators.email]),
  });
  public passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });
  userData: {};
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookieService: CookieService,
    private helperTool: HelperToolsService,
    private validateService: ValidateFormService
  ) {
    this.userData = environment.userInfo;
    this.mainInfoForm.patchValue(this.userData);
  }

  ngOnInit(): void {}

  updateUserData() {
    if (this.mainInfoForm.valid) {
      this.spinner.show();
      this.authService
        .updateUserdata(this.userData['id'], {
          email: this.mainInfoForm.value.email,
          name: this.mainInfoForm.value.name,
        })
        .subscribe(
          (data) => {
            if (data['success']) {
              this.helperTool.showAlertWithTranslation(
                '',
                'User data has been updated',
                'success'
              );
              this.spinner.hide();
            } else {
            }
          },
          (err) => {
            this.spinner.hide();
            if (
              err['error']['errors'][0]['message'] == 'response.conflict.email'
            ) {
              this.helperTool.showAlertWithTranslation(
                '',
                'Email is already existed',
                'error'
              );
            }
            console.log(err);
          }
        );
    } else {
      this.validateService.validateAllFormFields(this.mainInfoForm);
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.spinner.show();
      this.authService
        .changeUserpassword(this.passwordForm.value, this.userData['id'])
        .subscribe(
          (data) => {
            if (data['success']) {
              // console.log(data);
              this.passwordForm.reset();
              this.helperTool.showAlertWithTranslation(
                '',
                'Password has been changed',
                'success'
              );
              this.spinner.hide();
            }
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
            if ((err['error']['message'] = 'incorrect Password')) {
              this.helperTool.showAlertWithTranslation(
                '',
                'Password is incorrect',
                'error'
              );
            } else {
              this.helperTool.showAlertWithTranslation(
                '',
                'Something wrong happend',
                'error'
              );
            }
          }
        );
    } else {
      this.validateService.validateAllFormFields(this.passwordForm);
    }
  }
}
