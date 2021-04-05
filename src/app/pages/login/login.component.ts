import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { environment } from 'src/environments/environment';

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
  expiredIn: Date;
  constructor(
    private modalService: BsModalService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private authService: AuthService,
    private helperTool: HelperToolsService,
    private router: Router
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {}

  loginUser(): void {
    this.spinner.show();
    const sentDat = {};
    sentDat['phone'] = this.loginFrom.value.phone;
    sentDat['password'] = this.loginFrom.value.password;
    this.authService.loginUser(sentDat).subscribe(
      (data) => {
        if (data['success']) {
          this.expiredIn = new Date(+data['data']['token']['expiresIn'] * 1000);
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
          this.router.navigate(['/']);
          this.spinner.hide();
        }
      },
      (err) => {
        console.log(err);
        if (err['error']['message'] == 'controllers.auth.notActiveAccount') {
          this.helperTool.showAlertWithTranslation(
            '',
            'This account has not been activated yet',
            'error'
          );
        }
        if (err['error']['message'] == 'controllers.auth.incorrectCredential') {
          this.helperTool.showAlertWithTranslation(
            '',
            'Account not found or incorrect credential.',
            'error'
          );
        }
        this.spinner.hide();
      }
    );
  }
}
