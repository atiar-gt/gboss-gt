import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionCategoryService } from 'app/modules/setup/services/requisition-category/requisition-category.service';
import { RequisitionTypeService } from 'app/modules/setup/services/requisition-type/requisition-type.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-edit-requisition-category',
    templateUrl: './add-edit-requisition-category.component.html',
    styleUrls: ['./add-edit-requisition-category.component.scss'],
})
export class AddEditRequisitionCategoryComponent implements OnInit {
    userId: string;
    form: FormGroup;
    requisitionTypes;
    file_store: FileList;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: RequisitionCategoryService,
        private _requisitionTypeService: RequisitionTypeService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.getRequisitionTypes();
        this.userId = this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.setFormData();
        }
        this.form = this._fb.group({
            name: ['', Validators.required],
            typeId: ['', Validators.required]
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
                this._router.navigateByUrl('setup/requisition-category');
            }
        });
    }

    getRequisitionTypes(): void {
        this._requisitionTypeService.getAll().subscribe(res=> {
            this.requisitionTypes = res.data;
        })
    }

    update(): void {
        this._service.update(this.form.value, +this.userId).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('setup/requisition-category');
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
