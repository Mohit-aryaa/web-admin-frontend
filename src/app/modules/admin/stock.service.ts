import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/products/stock';



  getStock(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }


  updateStock(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }

  filterStock(data) {
    return this._http.get(this.api_url+'?filter='+ data);
  }

  updateBundleStock(dataId:any, data: any) {
    return this._http.put(this.api_url+'/bundle/'+dataId, data);
  }
  
}
