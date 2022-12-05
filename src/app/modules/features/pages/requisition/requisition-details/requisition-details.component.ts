import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Requisition } from 'app/modules/features/models/requisition.model';

@Component({
    selector: 'app-requisition-details',
    templateUrl: './requisition-details.component.html',
    styleUrls: ['./requisition-details.component.scss'],
})
export class RequisitionDetailsComponent implements OnInit {
    form: FormGroup;
    requisitionData: Requisition;
    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<RequisitionDetailsComponent>,
        private _confirmationService: FuseConfirmationService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        _dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            statusCode: [],
            // remark: [],
        });
        this.requisitionData = this.data.requisitionData;
    }

    onSubmit(status): void {
        let config1 = {
            title: 'Do you want to Accept?',
            icon: {
                color: 'success' as const,
            },
            actions: {
                confirm: {
                    color: 'primary' as const,
                },
            },
        };

        let config2 = {
            title: 'Do you want to Reject?',
        };

        if (status === 1) {
            this._confirmationService
                .open(config1)
                .afterClosed()
                .subscribe((result) => {
                    if (result === 'confirmed') {
                        this.form.get('statusCode').setValue(+status);
                        this._dialogRef.close(this.form.value);
                    }
                });
        } else if (status === 2) {
            this._confirmationService
                .open(config2)
                .afterClosed()
                .subscribe((result) => {
                    if (result === 'confirmed') {
                        this.form.get('statusCode').setValue(+status);
                        this._dialogRef.close(this.form.value);
                    }
                });
        }

        // this.form.get('statusCode').setValue(+status);
        // this._dialogRef.close(this.form.value);
    }

    close(): void {
        this._dialogRef.close();
    }
}
