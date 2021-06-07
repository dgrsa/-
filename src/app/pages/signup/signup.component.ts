import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/shared/services/window.service';
import * as firebase from 'firebase';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
declare var require: any;
var PhoneNumber = require('awesome-phonenumber');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isCodeSent: boolean = false;
  confirmationResult: any;
  windowRef: any;
  mobilePhone;
  public phoneFrom = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    verificationCode: new FormControl(''),
  });
  public registerForm = new FormGroup({
    phone: new FormControl({
      value: '',
      disabled: true,
    }),
    password: new FormControl('', Validators.required),
    terms: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });
  constructor(
    private win: WindowService,
    private helperTool: HelperToolsService,
    private validateService: ValidateFormService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    this.windowRef.recaptchaVerifier.render();
  }

  sendCode() {
    if (this.phoneFrom.valid) {
      var pn = new PhoneNumber(this.phoneFrom.value.phoneNumber, 'SA');
      if (pn.isMobile() && pn.isValid()) {
        const appVerifier = this.windowRef.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(pn.getNumber('e164'), appVerifier)
          .then((result) => {
            this.mobilePhone = pn.getNumber('e164');
            this.windowRef.confirmationResult = result;
            this.confirmationResult = result;
            this.helperTool.showAlertWithTranslation(
              '',
              'Code has been sent',
              'success'
            );
            this.phoneFrom
              .get('verificationCode')
              .setValidators([Validators.required]);
            this.phoneFrom.get('verificationCode').updateValueAndValidity();
          })
          .catch((error) => {
            if (error['message'] == 'TOO_SHORT') {
              this.helperTool.showAlertWithTranslation(
                '',
                'Invalid phone number',
                'error'
              );
            } else if (error['code'] == 'auth/too-many-requests') {
              this.helperTool.showAlertWithTranslation(
                '',
                'Too many attempts. try later',
                'error'
              );
            } else {
              this.helperTool.showAlertWithTranslation(
                '',
                'Something wrong happend',
                'error'
              );
            }
            console.log(error);
          });
      } else {
        this.helperTool.showAlertWithTranslation(
          '',
          'Invalid phone number',
          'error'
        );
      }
    } else {
      this.validateService.validateAllFormFields(this.phoneFrom);
    }
  }

  verifyLoginCode() {
    if (this.phoneFrom.valid) {
      this.windowRef.confirmationResult
        .confirm(this.phoneFrom.value.verificationCode)
        .then((result) => {
          this.authService.mobilePhone = this.mobilePhone;
          this.isCodeSent = result.user;
          this.helperTool.showAlertWithTranslation(
            '',
            'The phone number has been confirmed',
            'success'
          );
          this.router.navigate(['/signup/create-password']);
        })
        .catch((error) => {
          console.log(error, 'Incorrect code entered?');
          if (error['code'] == 'auth/code-expired') {
            this.helperTool.showAlertWithTranslation(
              '',
              'This code is expired',
              'error'
            );
          } else {
            this.helperTool.showAlertWithTranslation(
              '',
              'This code is wrong',
              'error'
            );
          }
        });
    } else {
      this.validateService.validateAllFormFields(this.phoneFrom);
    }
  }

  // createUser(): void {
  //   if (this.registerForm.valid) {
  //     this.spinner.show();
  //     const sentData = {};
  //     sentData['password'] = this.registerForm.value.password;
  //     sentData['phone'] = this.mobilePhone;
  //     this.authService.createUser(sentData).subscribe(
  //       (data) => {
  //         if (data['success']) {
  //           this.helperTool.showAlertWithTranslation(
  //             '',
  //             'Account has been created',
  //             'success'
  //           );
  //           this.router.navigate(['/login']);
  //           this.spinner.hide();
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.spinner.hide();
  //         for (let i = 0; i < err['error']['errors'].length; i++) {
  //           const element = err['error']['errors'][i];
  //           if (element['message'] == 'mobilePhone is already existed') {
  //             this.helperTool.showAlertWithTranslation(
  //               '',
  //               'This mpbile phone is already exists',
  //               'error'
  //             );
  //           } else if (element['message'] == 'email is already existed') {
  //             this.helperTool.showAlertWithTranslation(
  //               '',
  //               'Email is already existed',
  //               'error'
  //             );
  //           } else {
  //             this.helperTool.showAlertWithTranslation(
  //               '',
  //               'Something wrong happend',
  //               'error'
  //             );
  //           }
  //         }
  //         if (err['errors'][0]['message'] == '"email" must be a valid email') {
  //           this.helperTool.showAlertWithTranslation(
  //             '',
  //             'Email must be a valid email',
  //             'error'
  //           );
  //         }
  //       }
  //     );
  //   } else {
  //     this.validateService.validateAllFormFields(this.registerForm);
  //   }
  // }
}
