import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { Route, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from 'app/layout/common/user/user.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { featureRoutes } from './features.routing';

const featureRoutes: Route[] = [
  {
    path: 'employee',
    component: EmployeesComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  }
];

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(featureRoutes),
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    UserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class FeaturesModule { }
