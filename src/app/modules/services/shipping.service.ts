import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/shippings';


  getShipping(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
  }

  addShipping(data: any) {
    return this._http.post(this.api_url, data);
  }
 
  updateShipping(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }
  
  filterShipping(data: any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }

  deleteShipping( data: any) {
    return this._http.get(this.api_url+'/'+data._id, data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }
}
