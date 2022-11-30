import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Employee } from 'app/modules/features/models/employee.model';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';
import { RoleService } from 'app/modules/features/services/role/role.service';
import { Subject, takeUntil } from 'rxjs';
import _cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-assign-role',
    templateUrl: './assign-role.component.html',
    styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent implements OnInit {
    form: FormGroup;
    employeeRoles;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    roleId: number[] = [];
    delRoleIds: number[] = [];
    roles = new FormControl();

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
            employeeAdmin: [],
            employeeHr: [],
            employee: [],
            employeeSuperVisor: [],
            superAdmin: [],
        });
        this.getEmployeeData();
    }

    getEmployeeData(): void {
        this._employeeService.getSingleEmployee(this.data.data.id).subscribe((res) => {
            this.employeeRoles = res.data.roles;
            this.checkRoles(this.employeeRoles);
        });
        // console.log('data', this.data);
        
    }

    checkRoles(roles): void {
        roles.forEach((element) => {
            if (element.name === 'Employee') {
                this.form.get('employee').setValue(true);
            } else if (element.name === 'Admin') {
                this.form.get('employeeAdmin').setValue(true);
            } else if (element.name === 'HR') {
                this.form.get('employeeHr').setValue(true);
            } else if (element.name === 'Supervisor') {
                this.form.get('employeeSuperVisor').setValue(true);
            } else if (element.name === 'Super Admin') {
                this.form.get('superAdmin').setValue(true);
            }
        });
    }

    checkItem(id: number, event) {
        let testItems = [];
        this.employeeRoles.forEach((item: any) => {
            testItems.push(item.id);
        });

        if (!event.checked) {
            if (testItems.includes(id)) {
                if (!this.delRoleIds.includes(id)) {
                    this.delRoleIds.push(id);
                }
            }
        } else if (event.checked) {
            if (!testItems.includes(id)) {
                if (!this.roleId.includes(id)) {
                    this.roleId.push(id);
                }
            }
        }
    }
    save(): void {
        const data = {
            employeeId: this.data.data.id,
            roleId: this.roleId,
            delRoleIds: this.delRoleIds,
        };

        this._dialogRef.close(data);
    }

    close(): void {
        this._dialogRef.close();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
