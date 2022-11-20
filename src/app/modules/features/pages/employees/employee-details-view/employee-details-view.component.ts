import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'app/modules/features/models/employee.model';

@Component({
    selector: 'app-employee-details-view',
    templateUrl: './employee-details-view.component.html',
    styleUrls: ['./employee-details-view.component.scss'],
})
export class EmployeeDetailsViewComponent implements OnInit {
    employeeData: Employee;

    constructor(
        private _dialogRef: MatDialogRef<EmployeeDetailsViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.employeeData = this.data.data;
    }

    close(): void {
        this._dialogRef.close();
    }
}
