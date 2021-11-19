import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubChildCategoryService {
  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.apiUrl;
  api_url = `${this.apiUrl}/subChildCategories`;

   getSubChildCategories(payload: any) :Observable<any> {
    return this._http.get(`${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`);
   }

  listSubChildCategories() {
    return this._http.get(this.api_url);
  }


   getDataBySubCategoryId(payload: any) :Observable<any> {
      return this._http.get(`${this.api_url}/getDataBySubCategoryId/${payload}`);
   }

  
  showSubChildCategories(payload: any) :Observable<any>{
    return this._http.get(`${this.api_url}/${payload}`)
  }

  addSubChildCategories(payload: any) {
   return this._http.post(this.api_url, payload);
  }

  updateSubChildCategories(params:any, payload: any) {
    return this._http.put(`${this.api_url}/${params}`, payload);
  }
  
  deleteSubChildCategories(payload: any) {
    return this._http.delete(this.api_url+'/'+payload._id, payload);
  }

  bulkDelete(payload: any) {
    return this._http.post(`${this.api_url}/bulkDelete`, payload)
  }

  uploadSubChildCategoryBanner(payload: any) {
    return this._http.post(`${this.api_url}/upload`, payload);
  }


  filterSubChildCategories(payload:any) :Observable<any>{
    return this._http.get(`${this.api_url}?filter=${payload}`);
  }
}
