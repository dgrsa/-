import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss'],
})
export class CreatePasswordComponent implements OnInit {
  public registerForm = new FormGroup({
    phone: new FormControl({
      value: '',
      disabled: true,
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
    cPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
    terms: new FormControl('', [Validators.required]),
  });
  constructor(
    private helperTool: HelperToolsService,
    private validateService: ValidateFormService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
    private router: Router
  ) {
    this.registerForm.patchValue({
      phone: this.authService.mobilePhone,
    });
  }

  ngOnInit(): void {}

  createUser(): void {
    if (this.registerForm.valid) {
      this.spinner.show();
      const sentData = {};
      sentData['password'] = this.registerForm.value.password;
      sentData['phone'] = this.authService.mobilePhone;
      this.authService.createUser(sentData).subscribe(
        (data) => {
          if (data['success']) {
            this.helperTool.showAlertWithTranslation(
              '',
              'Account has been created',
              'success'
            );
            this.router.navigate(['/login']);
            this.spinner.hide();
          }
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          for (let i = 0; i < err['error']['errors'].length; i++) {
            const element = err['error']['errors'][i];
            if (element['message'] == 'mobilePhone is already existed') {
              this.helperTool.showAlertWithTranslation(
                '',
                'This mpbile phone is already exists',
                'error'
              );
            } else if (element['message'] == 'email is already existed') {
              this.helperTool.showAlertWithTranslation(
                '',
                'Email is already existed',
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
          if (err['errors'][0]['message'] == '"email" must be a valid email') {
            this.helperTool.showAlertWithTranslation(
              '',
              'Email must be a valid email',
              'error'
            );
          }
        }
      );
    } else {
      this.validateService.validateAllFormFields(this.registerForm);
    }
  }
}
