import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.apiUrl;
  api_url = `${this.apiUrl}/vendors`;

  getVendors(payload: any) :Observable<any> {
    return this._http.get(`${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`);
  }

  listVendors() :Observable<any>{
     return this._http.get(this.api_url)
  }

  showVendor(params:any) {
     return this._http.get(`${this.api_url}/${params}`)
  }

  addVendors(payload: any) {
    return this._http.post(this.api_url, payload);
  }

  updateVendors(params:any, payload: any) {
    return this._http.put(`${this.api_url}/${params}`, payload);
  }

  deleteVendors(payload: any) {
    return this._http.delete(this.api_url+'/'+payload._id, payload);
  }

  bulkDelete(payload: any) {
    return this._http.post(`${this.api_url}/bulkDelete`, payload)
  }


  filterVendors(payload:any) :Observable<any>{
    return this._http.get(`${this.api_url}?filter=${payload}`);
  }
}
