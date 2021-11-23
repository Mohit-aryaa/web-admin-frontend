import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

    constructor(private _http: HttpClient) { }

    api_url: string = environment.apiUrl + '/coupons';

    getCoupons(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    listCoupons(): Observable<any> {
        return this._http.get(this.api_url);
    }

    showCoupon(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    addCoupon(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateCoupon(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteCoupons(payload: any) {
        return this._http.delete(this.api_url + '/' + payload._id, payload);
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

    setPublish(payload:any){
        return this._http.post(`${this.api_url}/setPublish`, payload)
    }

    filterCoupons(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
