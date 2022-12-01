import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        _dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.form = this._fb.group({
            statusCode: [],
            // remark: [],
        });
        console.log('DATA', this.data);
        this.requisitionData = this.data.requisitionData;
    }

    onSubmit(status): void {
        this.form.get('statusCode').setValue(+status);
        this._dialogRef.close(this.form.value);
    }

    save(): void {
        // console.log('submitted', this.form.value);

    }

    close(): void {
        this._dialogRef.close();
    }
}
