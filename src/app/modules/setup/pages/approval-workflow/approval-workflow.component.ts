import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditApprovalWorkflowComponent } from './add-edit-approval-workflow/add-edit-approval-workflow.component';

@Component({
    selector: 'app-approval-workflow',
    templateUrl: './approval-workflow.component.html',
    styleUrls: ['./approval-workflow.component.scss'],
})
export class ApprovalWorkflowComponent implements OnInit {
    constructor(private _dialog: MatDialog, private _router: Router) {}
    ngOnInit(): void {}

    addNew(): void {
        this._router.navigateByUrl('setup/approval-workflow/add-new');
    }
}
