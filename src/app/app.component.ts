import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEmitterService } from './shared/services/language-emmiter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prodone';
  options = { direction: 'ltr' };
  constructor(
    private translate: TranslateService,
    private changeLang: LanguageEmitterService
  ) {
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
