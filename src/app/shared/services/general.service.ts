import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  getBanners() {
    const URL = `${environment.BASE_URL}/banner`;
    return this.http.get(URL);
  }
}
