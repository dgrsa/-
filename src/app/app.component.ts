import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { firebaseConfig } from './fireConfig';
import { LanguageEmitterService } from './shared/services/language-emmiter.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prodone';
  options = { direction: 'ltr' };
  deviceInfo;
  constructor(
    private translate: TranslateService,
    private changeLang: LanguageEmitterService,
    public deviceService: DeviceDetectorService
  ) {
    firebase.initializeApp(firebaseConfig);
    if (this.deviceService.isDesktop()) {
      window.location.href = 'http://brodone.net';
    }
    //subscribe to language change
    this.changeLang.changeEmitted$.subscribe((lang) => {
      // console.log(lang);
      if (lang['direction']) {
        this.options.direction = lang['direction'];
        // console.log(lang);
      }
    });

    // remember user langauge
    if (localStorage.getItem('language')) {
      let currentLang = localStorage.getItem('language');
      if (currentLang) {
        // console.log(currentLang);
        this.translate.use(currentLang);
        this.changeLang.emitChange({
          direction: currentLang == 'ar' ? 'rtl' : 'ltr',
        });
      } else {
        this.translate.use('en');
        // console.log(currentLang);
        this.changeLang.emitChange({ direction: 'ltr' });
      }
    } else {
      localStorage.setItem('language', 'en');
    }
  }
}
