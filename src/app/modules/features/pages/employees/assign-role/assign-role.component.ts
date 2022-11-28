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
    // employeeData: Employee;
    employeeRoles;
    allRoles;
    selectedToppings;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('select') select: MatSelect;
    prevRoles: [] = [];
    removedRoles: [] = [];
    newItems: [] = [];

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
        // this.setFormData();
        // this.form = this._fb.group({
        //     employeeId: ['', Validators.required],
        //     roleId: ['', Validators.required],
        //     delRoleIds: [],
        // });
        this.getAllRoles();
        this.getEmployeeData();
    }

    getEmployeeData(): void {
        this._employeeService.getRoles().subscribe((res) => {
            console.log('emp data', res.data);

            this.employeeRoles = res.data;
            // let arr;
            // arr = this.employeeData.roles.map((item: any) => {
            //     return item.id;
            // });
            // this.selectedToppings = arr;
            this.checkRoles(this.employeeRoles);
            // this.form.get('employeeId').patchValue(this.employeeData.id);
            // this.prevRoles = _cloneDeep(this.selectedToppings);
        });
    }

    checkRoles(roles): void {
        console.log('c roles', roles);
        
        roles.forEach((element) => {
            if (element.name === 'Employee') {
                this.form.get('employee').setValue(true);
            }
            else if(element.name === 'Admin'){
                this.form.get('employeeAdmin').setValue(true);
            }
            else if(element.name === 'HR'){
                this.form.get('employeeHr').setValue(true);
            }
            else if(element.name === 'Supervisor'){
                this.form.get('employeeSuperVisor').setValue(true);
            }
            else if(element.name === 'Super Admin'){
                this.form.get('superAdmin').setValue(true);
            }
        });
    }

    checkItem(id: number, event){
        // return this.form.controls[controlName].hasError(errorName);
        console.log('emp roles', this.employeeRoles);
        
        // console.log('c name', id);
        // console.log('event', event.checked);
        // let removedItems = [];
        // this.employeeData.roles.forEach((item: any) => {
        //     if (!event.checked && id === item.id) {
        //         removedItems.push(item.id);
        //     }
        // })
        // console.log('r items', removedItems);
        
        
    };

    getAllRoles(): void {
        this._roleService
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.allRoles = res.data;
                // this.form.get('roleId').setValue([9, 5]);
            });
    }

    save(): void {
        // if (this.form.valid) {
        //     this._dialogRef.close(this.form.value);
        // }
        console.log('SAVE', this.form.value);
    }

    close(): void {
        this._dialogRef.close();
    }

    triggerEvent(event): void {
        console.log('Event', event);

        // this.prevRoles = _cloneDeep(this.selectedToppings);
        // console.log('P roles', this.prevRoles);
        // let newValue = event.value;
        // console.log('newValue', newValue);
        // // let diff = this.prevRoles.diff(newValue);
        // let diff = this.prevRoles.filter((x) => !newValue.includes(x));
        // if (diff[diff.length - 1]) {
        //     console.log('Diff', diff[diff.length - 1]);
        //     this.removedRoles.push(diff[diff.length - 1])
        // }
        // console.log('removedRoles', this.removedRoles);

        // if (this.removedRoles.includes(diff[diff.length - 1])) {
        //     this.newItems.push(diff[diff.length - 1]);
        // } else {
        //     this.removedRoles.push(diff[diff.length - 1]);
        // }

        // console.log('newItems', this.newItems);

        // console.log('selectedToppings', prevRoles);

        // let prevRoles = this.allRoles.map((item) => {
        //     return item.id;
        // });
        // console.log('prevRoles', prevRoles);

        // console.log('E', event.target.value);
    }

    // onOption(event): void {
    //     console.log('E', event.target.value);
    // }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
