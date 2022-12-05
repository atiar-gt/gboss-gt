import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';
import { Requisition } from '../../models/requisition.model';
import { RequisitionService } from '../../services/requisition/requisition.service';
import { RequisitionDetailsComponent } from './requisition-details/requisition-details.component';

@Component({
    selector: 'app-requisition',
    templateUrl: './requisition.component.html',
    styleUrls: ['./requisition.component.scss'],
})
export class RequisitionComponent implements OnInit {
    // requisitionData = [];
    requisitions: Requisition[];
    currentState = 'Ongoing';
    // btnName = 'Request Type';
    // types = ['Accepted', 'Rejected', 'Pending'];
    pagination: { currentPage: 1; pageCount: 2; dataCount: 12 };
    // success: true,
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public _dialog: MatDialog,
        private _requisitionService: RequisitionService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.getPendingRequisitions();
    }

    getPendingRequisitions(): void {
        this._requisitionService
            .getPendingRequisitions()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                if (res.success) {
                    this.requisitions = res.data;
                }
            });
    }

    getAllRequisitions(): void {
        this._requisitionService
            .getAll()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                if (res.success) {
                    this.requisitions = res.data;
                }
            });
    }

    onView(requisition: Requisition): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { requisitionData: requisition };
        dialogConfig.width = '700px';
        dialogConfig.autoFocus = false;
        // dialogConfig.height = '400px';

        const dialogRef = this._dialog.open(
            RequisitionDetailsComponent,
            dialogConfig
        );

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._requisitionService
                    .requisitionSubmit(data, requisition.id)
                    .subscribe((res) => {
                        this._snackbar.openSnackBar(res.message);
                        if (res.success) {
                            this.getPendingRequisitions();
                        }
                    });
            }
        });
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        console.log('tabChangeEvent => ', tabChangeEvent);
        console.log('index => ', tabChangeEvent.index);
        if (tabChangeEvent.index === 0) {
            this.getPendingRequisitions();
            this.currentState = 'Ongoing';
        } else if (tabChangeEvent.index === 1) {
            this.getAllRequisitions();
            this.currentState = 'History';
        }
    };

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
