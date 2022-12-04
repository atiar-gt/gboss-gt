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
        this.form = this._fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
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
        this._roleService.create(this.form.value).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('role');
            }
        });
    }
    
    navigate(): void {
        this._router.navigateByUrl('role');
    }

    updateEmployee(): void {
        this._roleService
            .update(this.form.value, +this.userId)
            .subscribe((res) => {
                this._snackbar.openSnackBar(res.message);
                if (res.success) {
                    this._router.navigateByUrl('role');
                }
            });
    }

    setFormData(): void {
        this._roleService
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
