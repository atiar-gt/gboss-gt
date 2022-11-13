import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
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
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRolesComponent } from './pages/role/add-roles/add-roles.component';
import { RoleComponent } from './pages/role/role.component';
// import { featureRoutes } from './features.routing';

const featureRoutes: Route[] = [
  {
    path: 'roles',
    component: RoleComponent
  },
  {
    path: 'add-role',
    component: AddRolesComponent
  }
];

@NgModule({
  declarations: [
    RoleComponent,
    AddRolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(featureRoutes),
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
export class FeaturesModule { }
