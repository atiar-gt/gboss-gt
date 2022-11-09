import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { Route, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule
  ]
})
export class FeaturesModule { }
