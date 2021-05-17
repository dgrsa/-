import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { ValidateFormService } from 'src/app/shared/services/validate-form.service';
import { environment } from 'src/environments/environment';
declare var require: any;
var PhoneNumber = require('awesome-phonenumber');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  public loginFrom = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(''),
  });
  public passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  expiredIn: Date;
  fromLogin: boolean = false;
  message;
  constructor(
    private modalService: BsModalService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private authService: AuthService,
    private helperTool: HelperToolsService,
    private router: Router,
    private validForm: ValidateFormService,
    private route: ActivatedRoute,
    private messagingService: MessagingService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['cartlogin']) {
        this.fromLogin = true;
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {}

  loginUser(): void {
    if (this.loginFrom.valid) {
      var pn = new PhoneNumber(this.loginFrom.value.phone, 'EG');
      if (pn.isMobile() && pn.isValid()) {
        this.spinner.show();
        const sentDat = {};
        sentDat['phone'] = pn.getNumber('e164');
        sentDat['password'] = this.loginFrom.value.password;
        this.authService.loginUser(sentDat).subscribe(
          (data) => {
            if (data['success']) {
              this.messagingService.getPermission(
                data['data']['user']['id'],
                data['data']['token']['accessToken']
              );
              this.messagingService.receiveMessage();
              this.message = this.messagingService.currentMessage;
              this.expiredIn = new Date(
                +data['data']['token']['expiresIn'] * 1000
              );
              environment.userInfo = data['data']['user'];
              this.authService.emitChange({
                name: 'user_login',
                user_data: data['data']['user'],
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
                data['data']['user']['id'],
                this.expiredIn
              );
              if (this.fromLogin) {
                this.router.navigate(['/cart']);
              } else {
                this.router.navigate(['/']);
              }
              this.spinner.hide();
            }
          },
          (err) => {
            console.log(err);
            if (
              err['error']['message'] == 'controllers.auth.notActiveAccount'
            ) {
              this.helperTool.showAlertWithTranslation(
                '',
                'This account has not been activated yet',
                'error'
              );
            }
            if (
              err['error']['message'] == 'controllers.auth.incorrectCredential'
            ) {
              this.helperTool.showAlertWithTranslation(
                '',
                'Account not found or incorrect credential.',
                'error'
              );
            }
            this.spinner.hide();
          }
        );
      } else {
        this.helperTool.showAlertWithTranslation(
          '',
          'Invalid phone number',
          'error'
        );
      }
    } else {
      this.validForm.validateAllFormFields(this.loginFrom);
    }
  }

  onEmailSubmit() {
    if (this.passwordForm.valid) {
      this.spinner.show();
      this.authService.sendCode(this.passwordForm.value).subscribe(
        (data) => {
          if (data['success']) {
            this.spinner.hide();
            this.helperTool.showAlertWithTranslation(
              '',
              'A message was sent to your email',
              'success'
            );
            this.modalRef.hide();
            this.router.navigate(['/password/reset']);
            this.cookieService.set('userEmail', this.passwordForm.value.email);
          }
        },
        (err) => {
          this.spinner.hide();
          if (err['error']['message'] == 'controller.emailNotFound') {
            this.helperTool.showAlertWithTranslation(
              '',
              'This email was not found',
              'error'
            );
          }
          if (
            err['error']['errors']['length'] &&
            err['error']['errors'][0]['message'] ==
              `"email" must be a valid email`
          ) {
            this.helperTool.showAlertWithTranslation(
              '',
              'Email must be a valid email',
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
