import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CartComponent } from './shared/components/cart/cart.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModalComponent } from './shared/components/table-modal/table-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/auth/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { firebaseConfig } from './fireConfig';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { ScanCodeComponent } from './shared/components/scan-code/scan-code.component';
import { PrivacyComponent } from './shared/components/privacy/privacy.component';
import { TermsConditionsComponent } from './shared/components/terms-conditions/terms-conditions.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MessagingService } from './shared/services/messaging.service';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    CartComponent,
    TableModalComponent,
    NotFoundComponent,
    ScanCodeComponent,
    PrivacyComponent,
    TermsConditionsComponent,
  ],
  entryComponents: [CartComponent, TableModalComponent],
  imports: [
    BrowserModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClickOutsideModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    SwiperModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgQrScannerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ZXingScannerModule,
  ],
  providers: [
    CookieService,
    AuthGuard,
    MessagingService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
