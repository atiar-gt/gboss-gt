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
import { RoleService } from '../../services/role/role.service';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

@Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
    form: FormGroup;
    userId: number;
    permissionData;
    selected;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    menuId;
    roles: [] = [];
    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _paginatorService: PaginatorService,
        private _roleService: RoleService,
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
        this.getRoles();
    }

    getData(): void {
        this._paginatorService.tableChangeEvent.subscribe(
            (reloadEvent) => {
                this._menuPermissionService
                    .getPermissionByMenuId(this.userId, reloadEvent)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res) => {
                        this.permissionData = res.data;
                        this.selected = res.data[0].roleId;
                        this.paginator = res.pagination;
                        this._paginatorService._onTableDataChange.next(
                            res.pagination.dataCount
                        );
                    });
            },
            (error) => {}
        );
    }

    getRoles(): void {
        this._roleService
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.roles = res.data;
            });
    }

    onRole(roleId): void {
        this._paginatorService.tableChangeEvent.subscribe(
            (reloadEvent) => {
                this._menuPermissionService
                    .getPermissionByMenuIdAndRoleId(this.userId, roleId, reloadEvent)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res) => {
                        this.permissionData = res.data;
                        this.paginator = res.pagination;
                        this._paginatorService._onTableDataChange.next(
                            res.pagination.dataCount
                        );
                    });
            },
            (error) => {}
        );
    }

    onEdit(item): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { permissionData: item };
        dialogConfig.width = '600px';

        const dialogRef = this._dialog.open(
            EditPermissionComponent,
            dialogConfig
        );

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._menuPermissionService
                    .update(data, item.id)
                    .subscribe((res) => {
                        if (res.success) {
                            this.getData();
                        }
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
