/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/brands';

    getBrands(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    listBrands(): Observable<any> {
        return this._http.get(this.api_url);
    }

    showBrand(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    uploadBrandBanner(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    addBrands(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateBrands(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteBrands(params: any, payload: any) {
        return this._http.delete(`${this.api_url}/${params}`, payload);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }

    filterBrands(payload: any) {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
