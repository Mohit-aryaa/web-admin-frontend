import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/categories';

   getCategories(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   listCategories() {
    return this._http.get(this.api_url);
   }

  addCategories(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateCategories(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }
  
  deleteCategories(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }


  filterCategories(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
