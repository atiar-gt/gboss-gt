import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { UserModule } from 'app/layout/common/user/user.module';
import { AddEditMenuComponent } from './add-edit-menu/add-edit-menu.component';
import { PaginatorModule } from 'app/shared/components/paginator/paginator.module';
import { AssignRoleToMenuComponent } from './assign-role-to-menu/assign-role-to-menu.component';
import { PermissionComponent } from '../permission/permission.component';
import { EditPermissionComponent } from '../permission/edit-permission/edit-permission.component';
import { MatDialogModule } from '@angular/material/dialog';

const menuRoutes: Route[] = [
    {
        path: '',
        component: MenuComponent,
    },
    {
        path: 'add-new',
        component: AddEditMenuComponent,
    },
    {
        path: 'edit/:id',
        component: AddEditMenuComponent,
    },
    {
        path: 'permission',
        component: PermissionComponent,
    },
];

@NgModule({
    declarations: [
        MenuComponent,
        AddEditMenuComponent,
        AssignRoleToMenuComponent,
        PermissionComponent,
        EditPermissionComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(menuRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatIconModule,
        UserModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatChipsModule,
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        PaginatorModule,
    ],
})
export class MenuModule {}
