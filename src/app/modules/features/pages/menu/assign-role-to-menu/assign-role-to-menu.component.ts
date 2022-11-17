import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'app/modules/features/services/role/role.service';

@Component({
  selector: 'app-assign-role-to-menu',
  templateUrl: './assign-role-to-menu.component.html',
  styleUrls: ['./assign-role-to-menu.component.scss']
})
export class AssignRoleToMenuComponent implements OnInit {
  roleId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private _service: RoleService) { }

  ngOnInit(): void {
    console.log('role data', this.data);
    this.roleId = this.data.roleId;
  }

}
