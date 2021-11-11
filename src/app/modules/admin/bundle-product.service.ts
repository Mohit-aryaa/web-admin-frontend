import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BundleProductService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/bundleProducts';

   getBundleProducts(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   showProduct(Id: any) {
    return this._http.get(this.api_url+'/'+Id)
  }

   listBundleProducts() {
    return this._http.get(this.api_url);
   }

  addBundleProducts(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateBundleProducts(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }
  
  deleteBundleProducts(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }

  removeImage(data: any) {
    return this._http.post(this.api_url+'/removeImage/', data)
  }
  
  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

  uploadBundleProductImage(data:any) {
    return this._http.post(this.api_url+'/store', data);
  }


  filterBundleProducts(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
