import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'app/modules/features/models/employee.model';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';

@Component({
    selector: 'app-employee-details-view',
    templateUrl: './employee-details-view.component.html',
    styleUrls: ['./employee-details-view.component.scss'],
})
export class EmployeeDetailsViewComponent implements OnInit {
    employeeData: Employee;

    constructor(
        private _dialogRef: MatDialogRef<EmployeeDetailsViewComponent>,
        private _employeeService: EmployeesService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this._employeeService.getById(this.data.data).subscribe((res) => {
            this.employeeData = res.data;
        });
    }

    close(): void {
        this._dialogRef.close();
    }
}
