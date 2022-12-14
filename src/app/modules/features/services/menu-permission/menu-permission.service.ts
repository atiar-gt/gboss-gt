import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/services/data/data.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuPermissionService extends DataService {
    constructor(http: HttpClient) {
        super(http, '/menu/permissions');
    }

    getPermissionByMenuId(id: number, urlParameters): Observable<any> {
        return this.http.get(
            `${environment.baseUrl}/menu/permissions?menuId=${id}`,
            {
                params: urlParameters ? urlParameters : null,
            }
        );
    }
    
    getPermissionByMenuIdAndRoleId(menuId: number, roleId: number,  urlParameters): Observable<any> {
        return this.http.get(
            `${environment.baseUrl}/menu/permissions?menuId=${menuId}&roleId=${roleId}`,
            {
                params: urlParameters ? urlParameters : null,
            }
        );
    }
}
