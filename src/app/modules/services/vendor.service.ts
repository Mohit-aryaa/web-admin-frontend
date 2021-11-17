import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/vendors';

  getVendors(data:any) {
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   listVendors() {
     return this._http.get(this.api_url)
   }

   showVendor(data:any) {
     return this._http.get(this.api_url+'/'+data)
   }

  addVendors(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateVendors(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }

  deleteVendors(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

  uploadVendors(data:any) {
    return this._http.post(this.api_url+'/store', data);
  }

  filterVendors(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
