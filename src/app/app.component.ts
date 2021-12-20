import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { firebaseConfig } from './fireConfig';
import { LanguageEmitterService } from './shared/services/language-emmiter.service';
import * as firebase from 'firebase';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { MessagingService } from './shared/services/messaging.service';
import { CookieService } from 'ngx-cookie-service';
import * as io from 'socket.io-client';
import sailsIo from 'sails.io.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prodone';
  options = { direction: 'ltr' };
  deviceInfo;
  previousUrl;
  sio = sailsIo(io);
  constructor(
    private translate: TranslateService,
    private changeLang: LanguageEmitterService,
    public deviceService: DeviceDetectorService,
    public messagingService: MessagingService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('BuserId')) {
      this.sio.sails.query = `id=${this.cookieService.get('BuserId')}`;
      this.sio.sails.url = 'http://api.test.brodone.net:13381';
      this.sio.socket.get(`/socket/joinUser`, async (data) => {
        console.log(data);
      });
    }
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.changeLang.previousUrl = events[0].urlAfterRedirects;
      });
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

  ngOnInit(): void {
    if (this.cookieService.get('Btoken')) {
      this.messagingService.getPermission(
        this.cookieService.get('BuserId'),
        this.cookieService.get('Btoken')
      );
      this.messagingService.receiveMessage();
    }
  }
}
