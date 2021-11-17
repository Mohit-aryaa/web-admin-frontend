import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http: HttpClient) { }

  api_url = 'http://localhost:3000/questions';



  getQuestions(data:any) {
    return this._http.get(this.api_url+'?offset='+data.params.offset+'&limit='+data.params.limit+'&previousSize='+data.params.previousSize);
   }

  updateAnswers(dataId:any, data: any) {
    return this._http.put(this.api_url+'/'+dataId, data);
  }

  filterQuestions(data) {
    return this._http.get(this.api_url+'?filter='+ data);
  }


  deleteQuestions(data: any) {
    return this._http.delete(this.api_url+'/'+data._id, data);
  }

  bulkDelete(data: any) {
    return this._http.post(this.api_url+'/bulkDelete', data)
  }

}
