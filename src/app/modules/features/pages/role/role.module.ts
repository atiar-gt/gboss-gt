import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { UserModule } from 'app/layout/common/user/user.module';

const roleRoutes: Route[] = [
  {
    path: '',
    component: RoleComponent
  },
  {
    path: 'add-new',
    component: AddRolesComponent
  }
];

@NgModule({
  declarations: [RoleComponent, AddRolesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    UserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class RoleModule { }
