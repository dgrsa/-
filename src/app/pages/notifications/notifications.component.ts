import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications = [];
  offset = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  infiniteScroll;
  @ViewChild(InfiniteScrollDirective)
  set appScroll(directive: InfiniteScrollDirective) {
    this.infiniteScroll = directive;
  }
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    public messagingService: MessagingService,
    private router: Router
  ) {
    this.messagingService.changeEmitted$.subscribe(count => {
      if (router.url == '/notifications') {
        this.getNotifications();
      }
    })
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.authService
      .getNotifications(this.offset - 1, this.cookieService.get('BuserId'))
      .subscribe(
        (data) => {
          if (data['success'] && data['data']['rows'].length > 0) {
            this.messagingService.emitChange(0);
            if (this.offset == 1) {
              this.notifications = data['data']['rows'];
            } else {
              this.notifications = this.notifications.concat(data['data']['rows']);
              this.infiniteScroll.ngOnDestroy();
              this.infiniteScroll.setup();
            }
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }
  onScroll() {
    this.offset++;
    this.getNotifications();
  }
}
