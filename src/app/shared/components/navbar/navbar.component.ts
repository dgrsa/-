import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEmitterService } from '../../services/language-emmiter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  sidebarFlag: boolean = false;
  constructor(
    public translate: TranslateService,
    private changeLanguage: LanguageEmitterService
  ) {}

  ngOnInit(): void {}

  toggleNav(e: any) {
    if (e == 'open') {
      this.isOpen = true;
      this.sidebarFlag = true;
    } else if (e == 'close') {
      this.isOpen = false;
      this.sidebarFlag = false;
    }
  }

  onClickedOutside(e: Event, type: any) {
    if (type) {
      this.sidebarFlag = false;
    } else {
      this.toggleNav('close');
    }
  }

  changeLang(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.changeLanguage.emitChange({
      direction: language == 'ar' ? 'rtl' : 'ltr',
    });
    location.reload();
  }
}
