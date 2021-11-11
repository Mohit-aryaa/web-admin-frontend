import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from 'app/mock-api/apps/ecommerce/inventory/data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/products';

  getProducts(data:any) {
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   showProduct(Id: any) {
     return this._http.get(this.api_url+'/'+Id)
   }

  listProduct() {
    return this._http.get(this.api_url)
  }

  addProducts(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateProducts(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
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
    return this._http.post(this.api_url+'/store', data);
  }

  filterProduct(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
