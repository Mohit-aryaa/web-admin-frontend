import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from 'app/mock-api/apps/ecommerce/inventory/data';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private _http: HttpClient) { }

    apiUrl: string = environment.apiUrl;
    api_url = `${this.apiUrl}/products`;

    getProducts(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }

    showProduct(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}/${payload}`);
    }

    listProduct(): Observable<any> {
        return this._http.get(this.api_url);
    }

    addProducts(payload: any) {
        return this._http.post(this.api_url, payload);
    }

    updateProducts(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }

    deleteProducts(params: any) {
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

    uploadProductImage(payload: any) {
        return this._http.post(`${this.api_url}/upload`, payload);
    }

    filterProduct(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
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

    filterTable(payload:any): Observable<any> {
        return this._http.get(`${this.api_url}?searchInput=${payload.searchInput}&product=${payload.product}&category=${payload.category}&vendor=${payload.vendor}&publish=${payload.publish}`);
    }
}
