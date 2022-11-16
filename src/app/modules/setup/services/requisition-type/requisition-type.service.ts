import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'app/shared/services/data/data.service';

@Injectable({
    providedIn: 'root',
})
export class RequisitionTypeService extends DataService {
    constructor(http: HttpClient) {
        super(http, '/requisition/type');
    }
}
