import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications = [];
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.authService
      .getNotifications(0, 100, this.cookieService.get('BuserId'))
      .subscribe(
        (data) => {
          if (data['success']) {
            this.notifications = data['data'];
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
