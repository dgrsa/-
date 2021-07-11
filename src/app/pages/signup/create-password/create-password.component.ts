import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { LanguageEmitterService } from 'src/app/shared/services/language-emmiter.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { environment } from 'src/environments/environment';

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
  message;
  expiredIn: Date;
  previousUrl;
  constructor(
    private helperTool: HelperToolsService,
    private validateService: ValidateFormService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private messagingService: MessagingService,
    private changeLang: LanguageEmitterService
  ) {
    this.previousUrl = changeLang.previousUrl;
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
            // this.messagingService.getPermission(
            //   data['data']['id'],
            //   data['data']['token']['accessToken']
            // );
            // this.messagingService.receiveMessage();
            // this.message = this.messagingService.currentMessage;
            this.expiredIn = new Date(
              +data['data']['token']['expiresIn'] * 1000
            );
            environment.userInfo = data['data'];
            this.authService.emitChange({
              name: 'user_login',
              user_data: data['data'],
            });
            this.authService.emitTokenChange(
              data['data']['token']['accessToken']
            );
            this.cookieService.set(
              'Btoken',
              data['data']['token']['accessToken'],
              this.expiredIn
            );
            this.cookieService.set(
              'BuserId',
              data['data']['id'],
              this.expiredIn
            );
            if (this.previousUrl) {
              // this.router.navigate([this.previousUrl]);
              window.location.href = this.previousUrl;
            } else {
              // this.router.navigate(['/']);
              window.location.href = '/';
            }
            this.spinner.hide();
          }
        },
        (err) => {
          console.error(err);
          this.spinner.hide();
          for (let i = 0; i < err['error']['errors'].length; i++) {
            const element = err['error']['errors'][i];
            if (element['message'] == 'response.conflict.phone') {
              this.helperTool.showAlertWithTranslation(
                '',
                'This mpbile phone is already exists',
                'error'
              );
            }
            // else if (element['message'] == 'email is already existed') {
            //   this.helperTool.showAlertWithTranslation(
            //     '',
            //     'Email is already existed',
            //     'error'
            //   );
            // }
            else {
              this.helperTool.showAlertWithTranslation(
                '',
                'Something wrong happend',
                'error'
              );
            }
          }
        }
      );
    } else {
      this.validateService.validateAllFormFields(this.registerForm);
    }
  }
}
