import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
    constructor(
        private _dialogRef: MatDialogRef<DetailsViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        console.log('data', this.data);
    }
}
