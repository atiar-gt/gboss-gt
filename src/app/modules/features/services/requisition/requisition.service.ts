import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/services/data/data.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RequisitionService extends DataService {
    constructor(http: HttpClient) {
        super(http, '/requisitions');
    }

    requisitionSubmit(resource: any, id: number): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}/requisitions/approval/${id}`,
            resource
        );
    }

    getPendingRequisitions(urlParameters?): Observable<any> {
        return this.http.get(`${environment.baseUrl}/requisitions?statusCode=0`, {
            params: urlParameters ? urlParameters : null,
        });
    }
}
