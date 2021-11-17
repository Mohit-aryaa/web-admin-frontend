import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }
   //user queries
  api_url = 'http://localhost:3000/users'
  getUser(data): Observable <any>{
      return this._httpClient.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
  }
  addUser(data: any) {
      return this._httpClient.post(this.api_url, data)
  } 
  updateUser(id, data: any) {
    return this._httpClient.put(this.api_url+'/'+id, data)
  }
  deleteUser(del:any ) {
    return this._httpClient.delete(this.api_url+'/'+del._id, del)  
  }

  filterUser(data:any) {
    return this._httpClient.get(this.api_url+'?filter='+ data);
  }
  
}
