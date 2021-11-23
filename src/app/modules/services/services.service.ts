/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/services';

    getServices(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    showService(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    listServices(): Observable<any> {
        return this._http.get(this.api_url);
    }

    addServices(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateServices(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteServices(params: any) {
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

    uploadServicesImage(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    filterServices(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }

    setPublish(payload: any){
        return this._http.post(`${this.api_url}/setPublish`, payload);
    }

    setTodaysDeal(payload: any){
        return this._http.post(`${this.api_url}/setTodaysDeal`, payload);
    }

    setFeatured(payload: any){
        return this._http.post(`${this.api_url}/setFeatured`, payload);
    }

    filterTable(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?searchInput=${payload.searchInput}&product=${payload.product}
        &category=${payload.category}&vendor=${payload.vendor}&publish=${payload.publish}`);
    }
}
