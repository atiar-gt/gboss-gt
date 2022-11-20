import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { PaginatorService } from 'app/shared/services/paginator/paginator.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuPermissionService } from '../../services/menu-permission/menu-permission.service';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

@Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
    toppings = new FormControl('');
    form: FormGroup;
    toppingList: string[] = ['Create', 'Edit', 'Approve', 'Delete'];
    userId: number;
    permissionData;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    menuId;
    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _paginatorService: PaginatorService,
        public _dialog: MatDialog,
        private _snackbar: SnackbarComponent,
        private _menuPermissionService: MenuPermissionService
    ) {}

    ngOnInit(): void {
        this.form = this._fb.group({
            isAdd: [false],
            isEdit: [false],
            isApprove: [false],
            isDelete: [false],
        });
        this.userId = +this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.getData();
        }
    }

    onChange(event, select, id) {
        // this.menuId = id;
        console.log('menuId', id);

        if (!event) {
            console.log('EVENT', event);
            console.log('SELECT', select);

            if (this.toppings.value.includes('Create')) {
                this.form.get('isAdd').setValue(true);
            } else {
                this.form.get('isAdd').setValue(false);
            }

            if (this.toppings.value.includes('Edit')) {
                this.form.get('isEdit').setValue(true);
            } else {
                this.form.get('isEdit').setValue(false);
            }

            if (this.toppings.value.includes('Approve')) {
                this.form.get('isApprove').setValue(true);
            } else {
                this.form.get('isApprove').setValue(false);
            }

            if (this.toppings.value.includes('Delete')) {
                this.form.get('isDelete').setValue(true);
            } else {
                this.form.get('isDelete').setValue(false);
            }
            // else if (this.toppings.value.includes('Edit'))
            console.log('toppings', this.form.value);
            console.log('idddd', id);

            this._menuPermissionService
                .update(this.form.value, id)
                .subscribe((res) => {
                    console.log('res', res);
                });
        }
    }

    getData(): void {
        // this._menuPermissionService.getPermissionByMenuId(this.userId).subscribe((res) => {
        //     console.log('permission data', res.data);
        //     this.permissionData = res.data;
        // });

        this._paginatorService.tableChangeEvent.subscribe(
            (reloadEvent) => {
                this._menuPermissionService
                    .getPermissionByMenuId(this.userId, reloadEvent)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res) => {
                        this.permissionData = res.data;
                        this.paginator = res.pagination;
                        this.setFormData();
                        this._paginatorService._onTableDataChange.next(
                            res.pagination.dataCount
                        );
                    });
            },
            (error) => {}
        );
    }

    setFormData(): void {
        console.log('setFormData', this.permissionData);
        // if (this.permissionData.isAdd) {
        //     this.form.get('isAdd').setValue(true);
        // }
        // else {
        //     this.form.get('isAdd').setValue(false);
        // }
        // this.form.patchValue(this.permissionData);
    }

    onEdit(item): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { permissionData: item };
        dialogConfig.width = '600px';

        const dialogRef = this._dialog.open(
            EditPermissionComponent,
            dialogConfig
        );

        // this.updateData(dialogRef);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._menuPermissionService
                    .update(data, item.id)
                    .subscribe((res) => {
                        console.log('res', res);
                        if (res.success) {
                            this._snackbar.openSnackBar(res.message);
                            this.getData();
                        }
                    });
            }
        });
    }

    updateData(dialogRef: MatDialogRef<EditPermissionComponent, any>): void {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
