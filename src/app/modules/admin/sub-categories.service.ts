import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/subCategories';

   getSubCategories(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   listSubCategories() {
    return this._http.get(this.api_url);
   }

   getDataByCategoryId(data: any) {
      return this._http.get(this.api_url+'/getDataByCategoryId/'+data);
   }

  addSubCategories(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateSubCategories(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }

  filterSubCategories(data) {
    return this._http.get(this.api_url+'?filter='+ data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

  uploadCategoryBanner(data:any) {
    return this._http.post(this.api_url+'/store', data);
  }

  deleteSubCategories(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }
}
