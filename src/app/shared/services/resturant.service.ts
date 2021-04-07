import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResturantService {
  constructor(private http: HttpClient) {}

  getResturant(skip) {
    const URL = `${environment.BASE_URL}/resturant`;
    return this.http.get(URL, { params: { skip: skip } });
  }
}
