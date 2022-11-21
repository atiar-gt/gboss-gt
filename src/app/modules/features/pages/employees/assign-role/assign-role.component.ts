import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'app/modules/features/models/employee.model';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';
import { RoleService } from 'app/modules/features/services/role/role.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-assign-role',
    templateUrl: './assign-role.component.html',
    styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent implements OnInit {
    form: FormGroup;
    employeeData: Employee;
    allRoles;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    roles = new FormControl();
    selectedToppings = [
        { id: 5, name: 'EMPLOYEE_ADMIN', code: '300' },
        { id: 1, name: 'EMPLOYEE', code: '600' },
    ];

    constructor(
        private _fb: FormBuilder,
        private _roleService: RoleService,
        private _employeeService: EmployeesService,
        private _dialogRef: MatDialogRef<AssignRoleComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        _dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            employeeId: ['', Validators.required],
            roleId: ['', Validators.required],
        });
        this.getEmployeeData();
        this.getAllRoles();
    }


    getEmployeeData(): void {
        this._employeeService.getById(+this.data.data.id).subscribe((res) => {
            this.employeeData = res.data;
            this.selectedToppings = this.employeeData.roles;
            // this.form.get('roles').setValue(this.employeeData.roles);

            this.form.get('employeeId').patchValue(this.employeeData.id);
        });
    }

    getAllRoles(): void {
        this._roleService
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.allRoles = res.data;
            });
    }

    save(): void {
        if (this.form.valid) {
            this._dialogRef.close(this.form.value);
        }
    }

    close(): void {
        this._dialogRef.close();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}