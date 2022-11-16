import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionCategoryService } from 'app/modules/setup/services/requisition-category/requisition-category.service';
import { RequisitionProductService } from 'app/modules/setup/services/requisition-product/requisition-product.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-edit-requisition-product',
    templateUrl: './add-edit-requisition-product.component.html',
    styleUrls: ['./add-edit-requisition-product.component.scss'],
})
export class AddEditRequisitionProductComponent implements OnInit {
    userId: string;
    form: FormGroup;
    requisitionCategories;
    file_store: FileList;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: RequisitionProductService,
        private _requisitionCategoryService: RequisitionCategoryService,
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
            categoryId: ['', Validators.required],
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
                this._router.navigateByUrl('setup/requisition-product');
            }
        });
    }

    getRequisitionTypes(): void {
        this._requisitionCategoryService.getAll().subscribe((res) => {
            this.requisitionCategories = res.data;
        });
    }

    update(): void {
        this._service.update(this.form.value, +this.userId).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this._router.navigateByUrl('setup/requisition-product');
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
