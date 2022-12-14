import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
    userId: string;
    form: FormGroup;
    file_store: FileList;
    bloodGroups:[] = [];
    genders:[] = [];
    requestTypes = ['Accepted', 'Rejected', 'Pending'];
    display: FormControl = new FormControl('', Validators.required);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _employeeService: EmployeesService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.userId = this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.setFormData();
        }

        this.form = this._fb.group({
            employeeCode: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.pattern('(?:(?:\\+|00)88|01)?\\d{11}')]],
            designation: ['', Validators.required],
            payrollDesignation: ['', Validators.required],
            bloodGroup: ['', Validators.required],
            gender: ['', Validators.required],
            officeName: ['', Validators.required],
            officeAddress: ['', Validators.required],
            sittingLocation: ['', Validators.required],
        });

        this.getBloodGroups();
        this.getGenders();
    }

    handleFileInputChange(l: FileList): void {
        this.file_store = l;
        if (l.length) {
            const f = l[0];
            const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
            this.display.patchValue(`${f.name}${count}`);
        } else {
            this.display.patchValue('');
        }
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.form.controls[controlName].hasError(errorName);
    };

    getGenders(): void {
        this._employeeService.getMasterData('Gender').subscribe((res) => {
            this.genders = res.data;
        });
    }

    getBloodGroups(): void {
        this._employeeService.getMasterData('BloodGroup').subscribe((res) => {
            this.bloodGroups = res.data;
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            if (this.userId) {
                this.updateEmployee();
            } else {
                this.addEmployee();
            }
        }
    }

    addEmployee(): void {
        this._employeeService.create(this.form.value).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('employee');
            }
        });
    }

    updateEmployee(): void {
        this._employeeService
            .update(this.form.value, +this.userId)
            .subscribe((res) => {
                this._snackbar.openSnackBar(res.message);
                if (res.success) {
                    this._router.navigateByUrl('employee');
                }
            });
    }

    onMenu(): void {
        this._router.navigateByUrl('employee');
    }

    setFormData(): void {
        this._employeeService
            .getById(+this.userId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.form.patchValue(res.data);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
