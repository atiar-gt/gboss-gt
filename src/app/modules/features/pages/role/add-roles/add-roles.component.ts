import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'app/modules/features/services/role/role.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-roles',
    templateUrl: './add-roles.component.html',
    styleUrls: ['./add-roles.component.scss'],
})
export class AddRolesComponent implements OnInit {
    userId: string;
    form: FormGroup;
    file_store: FileList;
    // display: FormControl = new FormControl('', Validators.required);
    // bloodGroups = ['B+', 'B-', 'A+', 'A-', 'O+', 'O-', 'AB+', 'AB-'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _roleService: RoleService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.userId = this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.setFormData();
        }
        console.log('user id', this.userId);

        this.form = this._fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
        });
    }

    
    onSubmit(): void {
        console.log(this.form.valid);
        if (this.form.valid) {
            if (this.userId) {
                this.updateEmployee();
            } else {
                this.addEmployee();
            }
        }
    }

    addEmployee(): void {
        this._roleService.create(this.form.value).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('roles');
            }
        });
    }

    updateEmployee(): void {
        this._roleService
            .update(this.form.value, +this.userId)
            .subscribe((res) => {
                this._snackbar.openSnackBar(res.message);
                if (res.success) {
                    this._router.navigateByUrl('roles');
                }
            });
    }

    setFormData(): void {
        this._roleService
            .getById(+this.userId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                console.log('res', res);
                this.form.patchValue(res.data);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
