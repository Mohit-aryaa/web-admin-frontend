/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class ShippingService {
    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/shipping';

    getShipping(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    addShipping(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateShipping(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    filterShipping(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }

    deleteShipping(params: any) {
        return this._http.delete(`${this.api_url}/${params._id}`, params);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }
}
