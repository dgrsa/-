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
  mobilePhone;
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

  resetPassword(resetData) {
    const URL = `${environment.BASE_URL}/client/reset-password`;
    return this.http.post(URL, resetData);
  }

  updateUserdata(id, userData) {
    const URL = `${environment.BASE_URL}/client/${id}`;
    return this.http.put(URL, userData, this.httpOptions);
  }

  changeUserpassword(passwordData, id) {
    const URL = `${environment.BASE_URL}/client/${id}/password`;
    return this.http.put(URL, passwordData, this.httpOptions);
  }

  createUser(sentData) {
    const URL = `${environment.BASE_URL}/client/signup`;
    return this.http.post(URL, sentData, this.httpOptions);
  }

  createOrder(sentData, userId) {
    const URL = `${environment.BASE_URL}/client/${userId}/order`;
    return this.http.post(URL, sentData, this.httpOptions);
  }

  getOrders(skip, status, id, userId) {
    const params = {} as any;
    if (skip != undefined) {
      params['skip'] = skip;
    }
    if (status != undefined) {
      params['status'] = status;
    }
    if (id != undefined) {
      params['id'] = id;
    }
    const URL = `${environment.BASE_URL}/client/${userId}/order`;
    return this.http.get(URL, {
      params: params,
      headers: this.httpOptions.headers,
    });
  }

  getNotifications(skip, userId) {
    const params = { skip } as any;
    let URL = `${environment.BASE_URL}/client/${userId}/notification`;
    return this.http.get(URL, {
      params: params,
      headers: this.httpOptions.headers,
    });
  }

  markAllNotificationsRea(clientId) {
    let URL = `${
      environment.BASE_URL
    }/client/${clientId}/notification/read?isRead=${true}`;
    return this.http.put(URL, {}, this.httpOptions.headers);
  }

  payOnline(clientId, orderId) {
    const URL = `${environment.BASE_URL}/client/${clientId}/order/${orderId}/checkout`;
    return this.http.post(URL, {}, this.httpOptions);
  }

  chackPaymentStatus(clientId, orderId) {
    const params = { orderId } as any;
    const URL = `${environment.BASE_URL}/client/${clientId}/order/payment-status`;
    return this.http.get(URL, {
      params: params,
      headers: this.httpOptions.headers,
    });
  }
}
