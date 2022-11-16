import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { RoleService } from '../../services/role/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    roleData;

    constructor(
        private _router: Router,
        private _roleService: RoleService,
        private _snackbar: SnackbarComponent,
        private _confirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    onEmployee(): void {
        this._router.navigateByUrl('role/add-new');
    }

    getData(): void {
        this._roleService
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.roleData = res.data;
                this.paginator = res.pagination;
            });
    }

    onEdit(role) {
        this._router.navigateByUrl(`role/edit/${role.id}`);
    }

    applyFilter(value) {
        this._roleService
            .filterByValue(value)
            .pipe(debounceTime(500), takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.roleData = res.data;
            });
    }

    onDelete(role) {
        this._confirmationService
            .open()
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this.roleData = this.roleData.filter(
                        (item: any) => item.id !== role.id
                    );

                    this._roleService.delete(role.id).subscribe((res) => {
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
