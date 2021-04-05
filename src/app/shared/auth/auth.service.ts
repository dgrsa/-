import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  token;
  httpOptions;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.tokenChangeEmitted$.subscribe((token) => {
      this.token = token;
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'bearer ' + token,
        }),
      };
    });

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.cookieService.get('Btoken'),
      }),
    };
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  emitTokenChange(change: any) {
    this.emitToken.next(change);
  }

  loginUser(userData) {
    const URL = `${environment.BASE_URL}/client/signin`;
    return this.http.post(URL, userData);
  }

  getUserdata(id) {
    const URL = `${environment.BASE_URL}/client/${id}`;
    return this.http.get(URL, this.httpOptions);
  }

  sendCode(sentData) {
    const URL = `${environment.BASE_URL}/client/forgot-password`;
    return this.http.post(URL, sentData);
  }
}
