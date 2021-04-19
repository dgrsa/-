import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

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
}
