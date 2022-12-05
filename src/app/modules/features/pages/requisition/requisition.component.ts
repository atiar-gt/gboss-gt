import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
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

    constructor(
        public _dialog: MatDialog,
        private _requisitionService: RequisitionService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.getPendingRequisitions();
    }

    getPendingRequisitions(): void {
        this._requisitionService.getPendingRequisitions().subscribe((res) => {
            if (res.success) {
                this.requisitions = res.data;
            }
        });
    }

    getAllRequisitions(): void {
        this._requisitionService.getAll().subscribe((res) => {
            if (res.success) {
                this.requisitions = res.data;
                console.log('all requisitionData', this.requisitions);
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

    // onAccept(data): void {
    //     let config = {
    //         title: 'Do you want to Accept?',
    //         icon: {
    //             color: 'success' as const,
    //         },
    //         actions: {
    //             confirm: {
    //                 color: 'primary' as const,
    //             },
    //         },
    //     };

    //     this._confirmationService
    //         .open(config)
    //         .afterClosed()
    //         .subscribe((result) => {
    //             if (result === 'confirmed') {
    //                 console.log('confirmed');

    //                 // this.permissionData =
    //                 //     this.permissionData.filter(
    //                 //         (item: any) => item.id !== role.id
    //                 //     );

    //                 // this._menuPermissionService.delete(role.id).subscribe((res) => {
    //                 //     this._snackbar.openSnackBar(res.message);
    //                 // });
    //             }
    //         });
    // }

    // onReject(data): void {
    //     let config = {
    //         title: 'Do you want to Reject?',
    //     };

    //     this._confirmationService
    //         .open(config)
    //         .afterClosed()
    //         .subscribe((result) => {
    //             if (result === 'confirmed') {
    //                 console.log('confirmed');

    //                 // this.permissionData =
    //                 //     this.permissionData.filter(
    //                 //         (item: any) => item.id !== role.id
    //                 //     );

    //                 // this._menuPermissionService.delete(role.id).subscribe((res) => {
    //                 //     this._snackbar.openSnackBar(res.message);
    //                 // });
    //             }
    //         });
    // }

    // onFilter(name: string): void {
    //     this.btnName = name;
    // }

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
}
