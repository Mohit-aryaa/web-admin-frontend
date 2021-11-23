/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/categories';


    getCategories(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    listCategories(): Observable<any> {
        return this._http.get(this.api_url);
    }

    showCategories(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    addCategories(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateCategories(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteCategories(payload: any) {
        return this._http.delete(this.api_url + '/' + payload._id, payload);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }

    uploadCategoryBanner(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    filterCategories(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
