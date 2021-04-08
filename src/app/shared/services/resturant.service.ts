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

  getResturantById(id) {
    const URL = `${environment.BASE_URL}/resturant/${id}`;
    return this.http.get(URL);
  }

  getCategory() {
    const URL = `${environment.BASE_URL}/category`;
    return this.http.get(URL);
  }

  getSubCategory(id) {
    const URL = `${environment.BASE_URL}/subcategory`;
    return this.http.get(URL, { params: { parent_id: id } });
  }
}
