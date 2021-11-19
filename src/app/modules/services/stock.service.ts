import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.apiUrl;
  api_url = `${this.apiUrl}/products/stock`;


  getStock(payload:any): Observable <any>{
    return this._http.get(`${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`);
  }


  updateStock(params:any, payload: any) {
    return this._http.put(`${this.api_url}/${params}`, payload)
  }

  filterStock(payload:any) :Observable<any> {
    return this._http.get(`${this.api_url}?filter=${payload}`);
  }

  updateBundleStock(params:any, payload: any) {
    return this._http.put(`${this.api_url}/bundle/${params}`, payload);
  }
  
}
