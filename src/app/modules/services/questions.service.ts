import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuestionsService {
    constructor(private _http: HttpClient) { }

    apiUrl: string = environment.apiUrl;
    api_url = `${this.apiUrl}/questions`;

    getQuestions(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    updateAnswers(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    filterQuestions(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }

    deleteQuestions(params: any) {
        return this._http.delete(`${this.api_url}/${params._id}`, params);
    }

    bulkDelete(data: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, data);
    }
}
