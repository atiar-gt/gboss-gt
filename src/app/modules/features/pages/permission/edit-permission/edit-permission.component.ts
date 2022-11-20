import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-permission',
    templateUrl: './edit-permission.component.html',
    styleUrls: ['./edit-permission.component.scss'],
})
export class EditPermissionComponent implements OnInit {
    form: FormGroup;
    permissionData;

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditPermissionComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.form = this._fb.group({
            isAdd: [],
            isEdit: [],
            isApprove: [],
            isDelete: [],
        });
        this.setFormData();
    }

    close(): void {
        this._dialogRef.close();
    }

    save(): void {
        const body = {
            isAdd: this.form.get('isAdd').value,
            isEdit: this.form.get('isEdit').value,
            isApprove: this.form.get('isApprove').value,
            isDelete: this.form.get('isDelete').value,
        };

        this._dialogRef.close(body);
    }

    setFormData(): void {
        this.form.patchValue(this.data.permissionData);
        this.permissionData = this.data.permissionData;
    }
}
