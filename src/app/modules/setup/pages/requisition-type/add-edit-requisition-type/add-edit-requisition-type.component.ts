import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'app/modules/features/services/role/role.service';
import { RequisitionTypeService } from 'app/modules/setup/services/requisition-type/requisition-type.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-edit-requisition-type',
    templateUrl: './add-edit-requisition-type.component.html',
    styleUrls: ['./add-edit-requisition-type.component.scss'],
})
export class AddEditRequisitionTypeComponent implements OnInit {
    userId: string;
    form: FormGroup;
    file_store: FileList;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: RequisitionTypeService,
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
                this.update();
            } else {
                this.add();
            }
        }
    }

    add(): void {
        this._service.create(this.form.value).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('setup/requisition-type');
            }
        });
    }

    update(): void {
        this._service
            .update(this.form.value, +this.userId)
            .subscribe((res) => {
                this._snackbar.openSnackBar(res.message);
                if (res.success) {
                    this._router.navigateByUrl('setup/requisition-type');
                }
            });
    }

    setFormData(): void {
        this._service
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
