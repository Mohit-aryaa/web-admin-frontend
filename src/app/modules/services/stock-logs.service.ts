import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockLogsService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.apiUrl;
  api_url = `${this.apiUrl}/stockLogs`;


   getStockLogs(payload:any): Observable <any>{
    return this._http.get(`${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`);
  }
  
  filterStockLogs(payload:any) :Observable<any> {
    return this._http.get(`${this.api_url}?filter=${payload}`);
  }

  deleteStockLogs(params:any ) {
    return this._http.delete(`${this.api_url}/${params._id}`, params)  
  }

  bulkDelete(payload: any) {
    return this._http.post(`${this.api_url}/bulkDelete`, payload)
  }

}
