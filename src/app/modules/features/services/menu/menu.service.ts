import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/services/data/data.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService extends DataService {
    constructor(http: HttpClient) {
        super(http, '/menu');
    }

    getParentMenus(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/menu?type=1&page=0`);
    }
}
