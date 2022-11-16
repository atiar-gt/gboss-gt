import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { PaginatorService } from 'app/shared/services/paginator/paginator.service';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { Menu } from '../../models/menu.model';
import { MenuService } from '../../services/menu/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    paginator;
    menuData: Menu[];

    constructor(
        private _router: Router,
        private _menuService: MenuService,
        private _snackbar: SnackbarComponent,
        private _confirmationService: FuseConfirmationService,
        private _paginatorService: PaginatorService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    addNew(): void {
        this._router.navigateByUrl('menu-management/add-new');
    }

    getData(): void {
        // this._menuService
        //     .getAll()
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((res) => {
        //         this.menuData = res.data;
        //         this.paginator = res.pagination;
        //     });


            this._paginatorService.tableChangeEvent.subscribe(
                (reloadEvent) => {
                    this._menuService
                        .getAll(reloadEvent)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((res) => {
                            this.menuData = res.data;
                            this.paginator = res.pagination;
                            this._paginatorService._onTableDataChange.next(
                                res.pagination.dataCount
                            );
                        });
                },
                (error) => {}
            );
    }

    onEdit(menu) {
        this._router.navigateByUrl(`menu-management/edit/${menu.id}`);
    }

    // applyFilter(value) {
    //     this._menuService
    //         .filterByValue(value)
    //         .pipe(debounceTime(500), takeUntil(this._unsubscribeAll))
    //         .subscribe((res) => {
    //             this.menuData = res.data;
    //         });
    // }

    onDelete(role) {
        this._confirmationService
            .open()
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this.menuData = this.menuData.filter(
                        (item: any) => item.id !== role.id
                    );

                    this._menuService.delete(role.id).subscribe((res) => {
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