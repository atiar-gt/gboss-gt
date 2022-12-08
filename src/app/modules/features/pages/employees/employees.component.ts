import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { PaginatorService } from 'app/shared/services/paginator/paginator.service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees/employees.service';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { EmployeeDetailsViewComponent } from './employee-details-view/employee-details-view.component';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    employeeData: Employee[] = [];
    // paginator;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(
        private _confirmationService: FuseConfirmationService,
        private _employeeService: EmployeesService,
        private _paginatorService: PaginatorService,
        private _router: Router,
        public dialog: MatDialog,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.getEmployees();
    }

    getEmployees(): void {
        this._paginatorService.tableChangeEvent.subscribe(
            (reloadEvent) => {
                this._employeeService
                    .getAll(reloadEvent)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res) => {
                        this.employeeData = res.data;
                        this.paginator = res.pagination;

                        this._paginatorService._onTableDataChange.next(
                            res.pagination.dataCount
                        );
                    });
            },
            (error) => {}
        );
    }

    onEmployee(): void {
        this._router.navigateByUrl('employee/add-new');
    }

    onEdit(employee: Employee) {
        this._router.navigateByUrl(`employee/edit/${employee.id}`);
    }

    onAssign(employee: Employee): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { data: employee };
        dialogConfig.width = '500px';

        const dialogRef = this.dialog.open(AssignRoleComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._employeeService.assignEmployee(data).subscribe((res) => {
                    if (res.success) {
                    }
                    this._snackbar.openSnackBar(res.message);
                });
            }
        });
    }

    onView(data): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { data: data.id };
        dialogConfig.width = '600px';

        const dialogRef = this.dialog.open(
            EmployeeDetailsViewComponent,
            dialogConfig
        );
    }

    applyFilter(value) {
        this._employeeService
            .filterByValue(value)
            .pipe(debounceTime(500), takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.employeeData = res.data;
            });
    }

    onDelete(employee: Employee) {
        this._confirmationService
            .open()
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    this.employeeData = this.employeeData.filter(
                        (item: any) => item.id !== employee.id
                    );

                    this._employeeService
                        .delete(employee.id)
                        .subscribe((res) => {
                            this._snackbar.openSnackBar(res.message);
                        });
                }
            });
    }

    ngOnDestroy(): void {
        this._paginatorService.tableChangeEvent.next({ page: 1 });
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
