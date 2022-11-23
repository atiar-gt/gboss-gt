import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';
import { RequisitionCategoryService } from '../../services/requisition-category/requisition-category.service';

@Component({
    selector: 'app-requisition-category',
    templateUrl: './requisition-category.component.html',
    styleUrls: ['./requisition-category.component.scss'],
})
export class RequisitionCategoryComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    requisitionCategoryData;

    constructor(
        private _router: Router,
        private _service: RequisitionCategoryService,
        private _snackbar: SnackbarComponent,
        private _confirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    addNew(): void {
        this._router.navigateByUrl('setup/requisition-category/add-new');
    }

    getData(): void {
        this._service
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.requisitionCategoryData = res.data;
                this.paginator = res.pagination;
            });
    }

    onEdit(role) {
        this._router.navigateByUrl(
            `setup/requisition-category/edit/${role.id}`
        );
    }

    // applyFilter(value) {
    //     this._roleService
    //         .filterByValue(value)
    //         .pipe(debounceTime(500), takeUntil(this._unsubscribeAll))
    //         .subscribe((res) => {
    //             this.roleData = res.data;
    //         });
    // }

    onDelete(role) {
        this._confirmationService
            .open()
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this.requisitionCategoryData =
                        this.requisitionCategoryData.filter(
                            (item: any) => item.id !== role.id
                        );

                    this._service.delete(role.id).subscribe((res) => {
                        this._snackbar.openSnackBar(res.message);
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
