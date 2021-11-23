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
export class UserService {
    constructor(private _http: HttpClient) { }
    api_url: string = environment.apiUrl + '/users';

    getUser(payload: any): Observable<any> {
        return this._http.get(
            `${this.api_url}?offset=${payload.params.offset}&limit=${payload.params.limit}&previousSize=${payload.params.previousSize}`
        );
    }
    addUser(payload: any) {
        return this._http.post(this.api_url, payload);
    }
    updateUser(params: any, payload: any) {
        return this._http.put(`${this.api_url}/${params}`, payload);
    }
    deleteUser(payload: any) {
        return this._http.delete(this.api_url + '/' + payload._id, payload);
    }

    filterUser(payload: any): Observable<any> {
        return this._http.get(`${this.api_url}?filter=${payload}`);
    }
}
