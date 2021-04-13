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

  getTableById(id, table_id) {
    const URL = `${environment.BASE_URL}/resturant/${id}/table/${table_id}`;
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

  getResturantItems(resturant_id = undefined, subcategory_id = undefined) {
    const params = {} as any;
    if (subcategory_id != undefined && subcategory_id != '') {
      params['subcategory_id'] = subcategory_id;
    }
    if (resturant_id != undefined && resturant_id != '') {
      params['resturant_id'] = resturant_id;
    }
    const URL = `${environment.BASE_URL}/item`;
    return this.http.get(URL, {
      params: params,
    });
  }

  getItemById(id) {
    const URL = `${environment.BASE_URL}/item/${id}`;
    return this.http.get(URL);
  }
}
