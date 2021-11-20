import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

    constructor(private _http: HttpClient) { }

    apiUrl: string = environment.apiUrl;
    api_url = `${this.apiUrl}/consultants`;

    getConsultants(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    listConsultants(): Observable<any> {
        return this._http.get(this.api_url);
    }

    showConsultant(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    addConsultant(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateConsultant(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteConsultant(payload: any) {
        return this._http.delete(this.api_url + '/' + payload._id, payload);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }

    uploadConsultantLogo(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    filterConsultants(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
