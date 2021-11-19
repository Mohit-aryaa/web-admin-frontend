import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SubCategoriesService {
    constructor(private _http: HttpClient) { }

    apiUrl: string = environment.apiUrl;
    api_url = `${this.apiUrl}/subCategories`;

    getSubCategories(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    listSubCategories() {
        return this._http.get(this.api_url);
    }

    getDataByCategoryId(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/getDataByCategoryId/${payload}`);
    }

    showSubCategories(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    addSubCategories(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateSubCategories(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteSubCategories(payload: any) {
        return this._http.delete(this.api_url + '/' + payload._id, payload);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }

    uploadSubCategoryBanner(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    filterSubCategories(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
