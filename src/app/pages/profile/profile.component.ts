import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
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
  userData: {};
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.userData = environment.userInfo;
    this.mainInfoForm.patchValue(this.userData);
  }

  ngOnInit(): void {}
}
