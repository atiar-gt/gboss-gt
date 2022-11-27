import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'app/modules/features/services/menu/menu.service';
import { RoleService } from 'app/modules/features/services/role/role.service';

@Component({
    selector: 'app-assign-role-to-menu',
    templateUrl: './assign-role-to-menu.component.html',
    styleUrls: ['./assign-role-to-menu.component.scss'],
})
export class AssignRoleToMenuComponent implements OnInit {
    roleId: number;
    roles;
    menus;
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _roleService: RoleService,
        private _dialogRef: MatDialogRef<AssignRoleToMenuComponent>,
        private _menuService: MenuService,
        private _fb: FormBuilder
    ) {
        _dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.roleId = this.data.roleId;
        this.form = this._fb.group({
            menuId: ['', Validators.required],
            roleId: ['',Validators.required],
            isAdd: [],
            isEdit: [],
            isApprove: [],
            isDelete: [],
        });
        this.form.get('roleId').setValue(this.roleId);
        this.getRoles();
        this.getMenus();
    }

    getRoles(): void {
        this._roleService.getAll().subscribe((res) => {
            if (res.success) {
                this.roles = res.data;
            }
        });
    }

    getMenus(): void {
        this._menuService.getAll().subscribe((res) => {
            if (res.success) {
                this.menus = res.data;
            }
        });
    }

    save(): void {
        console.log('form v', this.form.valid);
        
        if (this.form.valid) {
            this._dialogRef.close(this.form.value);
        }
    }

    close(): void {
        this._dialogRef.close();
    }
}
