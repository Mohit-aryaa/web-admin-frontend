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
export class BundleProductService {
    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/bundleProducts';

    getBundleProducts(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    showBundleProduct(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    listBundleProduct(): Observable<any> {
        return this._http.get(this.api_url);
    }

    addBundleProducts(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateBundleProducts(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteBundleProducts(params: any) {
        return this._http.delete(`${this.api_url}/${params._id}`, params);
    }

    removeImage(payload: any) {
        return this._http.post(`${this.api_url}/removeImage`, payload);
    }

    bulkDelete(payload: any) {
        return this._http.post(`${this.api_url}/bulkDelete`, payload);
    }

    bulkPublish(payload: any) {
        return this._http.post(`${this.api_url}/bulkPublish`, payload);
    }

    bulkUnpublish(payload: any) {
        return this._http.post(`${this.api_url}/bulkUnpublish`, payload);
    }

    uploadBundleProductImage(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    setPublish(payload:any){
        return this._http.post(`${this.api_url}/setPublish`, payload)
    }

    setTodaysDeal(payload:any){
        return this._http.post(`${this.api_url}/setTodaysDeal`, payload)
    }

    setFeatured(payload:any){
        return this._http.post(`${this.api_url}/setFeatured`, payload)
    }

    filterBundleProducts(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
