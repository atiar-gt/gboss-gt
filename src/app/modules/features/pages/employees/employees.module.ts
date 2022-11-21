import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserModule } from 'app/layout/common/user/user.module';
import { PaginatorModule } from 'app/shared/components/paginator/paginator.module';
import { EmployeeDetailsViewComponent } from './employee-details-view/employee-details-view.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';

const employeeRoutes: Route[] = [
    {
        path: '',
        component: EmployeesComponent,
    },
    {
        path: 'add-new',
        component: AddEmployeeComponent,
    },
    {
        path: 'edit/:id',
        component: AddEmployeeComponent,
    },
];

@NgModule({
    declarations: [EmployeesComponent, AddEmployeeComponent, EmployeeDetailsViewComponent, AssignRoleComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(employeeRoutes),
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
        MatSelectModule,
        MatDialogModule,
        PaginatorModule,
    ],
})
export class EmployeesModule {}
