import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from 'app/mock-api/apps/ecommerce/inventory/data';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.apiUrl;
  api_url = `${this.apiUrl}/products`;

  getProducts(payload:any) :Observable<any> {
    return this._http.get(`${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`);
   }

  showProduct(payload: any) :Observable<any>{
     return this._http.get(`${this.api_url}/${payload}`)
  }

  listProduct() {
    return this._http.get(this.api_url)
  }

  addProducts(data: any) :Observable<any> {
   return this._http.post(this.api_url, data);
  }

  updateProducts(params:any, payload: any) {
    return this._http.put(`${this.api_url}/${params}`, payload);
  }

  deleteProducts(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }

  removeImage(data: any) {
    return this._http.post(this.api_url+'/removeImage/', data)
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

  uploadProductImage(data:any) {
    return this._http.post(`${this.api_url}/upload`, data);
  }

  filterProduct(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
