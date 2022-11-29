import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    protected readonly _baseUrl = `${environment.baseUrl}${this.customUrl}`;
    private messageSource = new BehaviorSubject('roles updated');
    currentMessage = this.messageSource.asObservable();

    constructor(
        protected http: HttpClient,
        @Inject('customUrl') @Optional() protected customUrl: string
    ) {}

    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    getAll(urlParameters?): Observable<any> {
        return this.http.get(`${this._baseUrl}`, {
            params: urlParameters ? urlParameters : null,
        });
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this._baseUrl}/${id}`);
    }

    create(resource: any): Observable<any> {
        return this.http.post(`${this._baseUrl}`, resource);
    }

    update(resource: any, id: number): Observable<any> {
        return this.http.put(`${this._baseUrl}/${id}`, resource);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this._baseUrl}/${id}`);
    }

    filterByValue(value: string): Observable<any> {
        return this.http.get(`${this._baseUrl}?query=${value}`);
    }

    getMasterData(item: string): Observable<any> {
        return this.http.get(`${environment.baseUrl}/setup/${item}`);
    }

    // menuPermission(url): Observable<any> {
    //     return this.http.get(`${environment.baseUrl}check-page-permission?link=${url}`);
    // }
}
