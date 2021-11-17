import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubChildCategoryService {
  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/subChildCategories';

   getSubChildCategories(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

  listSubChildCategories() {
    return this._http.get(this.api_url);
  }

   getDataBySubCategoryId(data: any) {
    return this._http.get(this.api_url+'/getDataBySubCategoryId/'+data);
   }

  addSubChildCategories(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateSubChildCategories(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }

  filterSubChildCategories(data) {
    return this._http.get(this.api_url+'?filter='+ data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

  deleteSubChildCategories(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }
}
