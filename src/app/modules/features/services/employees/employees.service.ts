import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/services/data/data.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeesService extends DataService {
    constructor(http: HttpClient) {
        super(http, '/employees');
    }

    getBloodGroups(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/setup/BloodGroup`);
    }

    assignEmployee(resource: any): Observable<any> {
        return this.http.post(`${environment.baseUrl}/employees/role`, resource);
    }
}
