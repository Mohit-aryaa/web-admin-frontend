import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/brands';

   getBrands(data:any) {
    //console.log(data.params.offset)
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

   listBrands() {
    return this._http.get(this.api_url);
   }

   showBrand(data: any) {
    return this._http.get(this.api_url+'/'+data)
   }

  addBrands(data: any) {
   return this._http.post(this.api_url, data);
  }

  updateBrands(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }
  
  deleteBrands(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }


  filterBrands(data:any) {
    return this._http.get(this.api_url+'?filter='+ data);
  }
}
