import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  private emitToken = new Subject<any>();
  tokenChangeEmitted$ = this.emitToken.asObservable();
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  emitTokenChange(change: any) {
    this.emitToken.next(change);
  }

  loginUser(userData) {
    const URL = `${environment.baseUrl}/client/signin`;
    return this.http.post(URL, userData);
  }
}
