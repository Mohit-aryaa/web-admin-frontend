import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _httpClient: HttpClient) { }

   //rolel queries
   api_url = 'http://localhost:3000/roles'

   getRoles(data:any): Observable <any>{
      //console.log(data)
       return this._httpClient.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }
   listRoles() {
      return this._httpClient.get(this.api_url);
   }
   addRoles(data: any) {
       return this._httpClient.post(this.api_url, data)
   } 
   updateRoles (id, data: any) {
     return this._httpClient.put(this.api_url+'/'+id, data)
   }
   deleteRoles(del:any ) {
     return this._httpClient.delete(this.api_url+'/'+del._id, del)  
   }
 
   filterRoles(data:any) {
     return this._httpClient.get(this.api_url+'?filter='+data);
   }
}
