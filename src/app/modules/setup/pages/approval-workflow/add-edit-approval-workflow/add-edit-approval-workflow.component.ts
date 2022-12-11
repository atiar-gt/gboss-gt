import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-approval-workflow',
    templateUrl: './add-edit-approval-workflow.component.html',
    styleUrls: ['./add-edit-approval-workflow.component.scss'],
})
export class AddEditApprovalWorkflowComponent implements OnInit {
    form: FormGroup;
    approvals: FormArray;
    removedApprovals: any[] = [];
    userId: string;

    constructor(private _fb: FormBuilder, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.userId = this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            // this.setFormData();
        }

        this.form = this._fb.group({
            name: [],
            code: [],
            approval: this._fb.array([]),
        });
    }

    createApproval(): any {
        return this._fb.group({
            // id: [''],
            roleId: [''],
            approvalOrder: [''],
        });
    }

    get approvalsForms(): any {
        return this.form.get('approval') as FormArray;
    }

    addItem(): any {
        this.approvals = this.form.get('approval') as FormArray;
        this.approvals.push(this.createApproval());
    }

    deleteItem(index, item): any {
        this.approvalsForms.removeAt(index);
        this.removedApprovals.push(item.value.id);
    }

    onSubmit(): void {
        console.log('SUBMITTED!');
    }
}
