import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorService } from 'app/shared/services/paginator/paginator.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuPermissionService } from '../../services/menu-permission/menu-permission.service';

@Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
    userId: number;
    permissionData;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    constructor(
        private _route: ActivatedRoute,
        private _paginatorService: PaginatorService,
        private _menuPermissionService: MenuPermissionService
    ) {}

    ngOnInit(): void {
        this.userId = +this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.getData();
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
                        this._paginatorService._onTableDataChange.next(
                            res.pagination.dataCount
                        );
                    });
            },
            (error) => {}
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
