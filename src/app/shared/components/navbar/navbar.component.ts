import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { LanguageEmitterService } from '../../services/language-emmiter.service';
import { MessagingService } from '../../services/messaging.service';
import { ResturantService } from '../../services/resturant.service';
import { CartComponent } from '../cart/cart.component';
import { TableModalComponent } from '../table-modal/table-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  sidebarFlag: boolean = false;
  bsModalRef: BsModalRef;
  hani = false;
  userData: any;
  authsub: Subscription;
  cartCount = 0;
  public searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  myCounter = 0;
  resturantId;
  constructor(
    public translate: TranslateService,
    private changeLanguage: LanguageEmitterService,
    private modalService: BsModalService,
    private authService: AuthService,
    public cookieService: CookieService,
    private cartService: CartService,
    private router: Router,
    private messagingService: MessagingService,
    private resturantService: ResturantService
  ) {
    this.resturantService.changeEmitted$.subscribe((value) => {
      this.resturantId = value;
    });
    this.resturantId = cookieService.get('resturantId');
    this.cartCount = environment.userCart['meals'].length;
    this.authsub = this.authService.changeEmitted$.subscribe((value) => {
      this.userData = value;
    });

    cartService.changeEmitted$.subscribe((cartItems) => {
      this.cartCount = cartItems;
    });
  }

  ngOnInit(): void {
    this.messagingService.changeEmitted$.subscribe((counter) => {
      this.getNotifications();
    });
    if (this.cookieService.get('Btoken')) {
      this.getNotifications();
    }
  }

  getNotifications(): void {
    this.authService
      .getNotifications(0, this.cookieService.get('BuserId'))
      .subscribe((data) => {
        this.myCounter = data['data']['count']['unReadCount'];
      });
  }

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

  openCartModal() {
    this.bsModalRef = this.modalService.show(CartComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openTableModal() {
    this.bsModalRef = this.modalService.show(TableModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  logout(): void {
    this.cookieService.delete('Btoken', '/');
    this.cookieService.delete('BuserId', '/');
    window.location.href = '/';
  }

  search(): void {
    this.toggleNav('close');
    this.router.navigate(['/resturant'], {
      queryParams: { special: false, name: this.searchForm.value.name },
    });
  }
}
