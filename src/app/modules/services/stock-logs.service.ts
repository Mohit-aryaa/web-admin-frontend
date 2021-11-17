import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockLogsService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/stockLogs';


   getStockLogs(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }
  
  filterStockLogs(data: any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }

  deleteStockLogs( data: any) {
    return this._http.get(this.api_url+'/'+data._id, data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

}
