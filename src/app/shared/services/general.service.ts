import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  constructor(private http: HttpClient) {}

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  getBanners(resturant_id = undefined) {
    const params = {} as any;
    if (resturant_id != undefined) {
      params['resturant_id'] = resturant_id;
    }
    const URL = `${environment.BASE_URL}/banner`;
    return this.http.get(URL, { params: params });
  }

  getPayments(resturant_id) {
    const params = {} as any;
    if (resturant_id != undefined && resturant_id != '') {
      params['resturant_id'] = resturant_id;
    }
    const URL = `${environment.BASE_URL}/payment`;
    return this.http.get(URL, { params: params });
  }

  callWaiter(sentData, resturantId, tableId) {
    const URL = `${environment.BASE_URL}/resturant/${resturantId}/table/${tableId}/call`;
    return this.http.post(URL, sentData);
  }

  getSettings() {
    const URL = `${environment.BASE_URL}/setting`;
    return this.http.get(URL);
  }
}
