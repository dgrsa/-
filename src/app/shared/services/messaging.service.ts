import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/messaging';
// import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  // messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  token;
  httpOptions;
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private angularFireMessaging: AngularFireMessaging // private authService: AuthService
  ) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
    // this.authService.tokenChangeEmitted$.subscribe((token) => {
    //   this.token = token;
    //   this.httpOptions = {
    //     headers: new HttpHeaders({
    //       Authorization: "bearer " + token,
    //     }),
    //   };
    // });
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'bearer ' + this.cookieService.get('Btoken'),
    //   }),
    // };
  }

  updateToken(id, firebase_device_id) {
    let URL = `${environment.BASE_URL}/client/${id}/device-id`;
    return this.http.put(
      URL,
      { firebase_device_id: firebase_device_id },
      this.httpOptions
    );
  }

  // getPermission(userId, token) {
  //   if (firebase.messaging.isSupported()) {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         Authorization: 'bearer ' + token,
  //       }),
  //     };
  //     firebase
  //       .messaging()
  //       .requestPermission()
  //       .then(() => {
  //         // console.log('Notification permission garented');
  //         return firebase.messaging().getToken();
  //       })
  //       .then((token) => {
  //         this.updateToken(userId, token);
  //         this.updateToken(userId, token).subscribe(
  //           (data) => {
  //             // console.log(data);
  //           },
  //           (err) => {
  //             console.log(err);
  //           }
  //         );
  //       })
  //       .catch((err) => {
  //         console.log('Unable to get permission to notify.', err);
  //       });
  //   }
  // }

  getPermission(userId, token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + token,
      }),
    };
    this.angularFireMessaging.requestToken.subscribe(
      (deviceId) => {
        this.updateToken(userId, deviceId);
        this.updateToken(userId, deviceId).subscribe(
          (data) => {
            // console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    firebase.messaging().onMessage((payload) => {
      // console.log('new message received.', payload);
      this.emitChange(1);
      this.currentMessage.next(payload);
    });
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
