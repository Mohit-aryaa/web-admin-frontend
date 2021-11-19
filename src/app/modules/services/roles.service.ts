import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor(private _http: HttpClient) { }

    apiUrl: string = environment.apiUrl;
    api_url = `${this.apiUrl}/roles`;

    getRoles(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }
    listRoles(): Observable<any> {
        return this._http.get(this.api_url);
    }
    addRoles(payload: any) {
        return this._http.post(this.api_url, payload);
    }
    updateRoles(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }
    deleteRoles(params: any) {
        return this._http.delete(`${this.api_url}/${params._id}`, params);
    }

    filterRoles(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
