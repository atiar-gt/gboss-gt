import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisitionTypeComponent } from './pages/requisition-type/requisition-type.component';
import { Route, RouterModule } from '@angular/router';
import { RequisitionCategoryComponent } from './pages/requisition-category/requisition-category.component';
import { RequisitionProductComponent } from './pages/requisition-product/requisition-product.component';
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
import { AddEditRequisitionTypeComponent } from './pages/requisition-type/add-edit-requisition-type/add-edit-requisition-type.component';
import { AddEditRequisitionCategoryComponent } from './pages/requisition-category/add-edit-requisition-category/add-edit-requisition-category.component';
import { AddEditRequisitionProductComponent } from './pages/requisition-product/add-edit-requisition-product/add-edit-requisition-product.component';

const setupRoutes: Route[] = [
    {
        path: 'requisition-type',
        component: RequisitionTypeComponent,
    },
    {
        path: 'requisition-type/add-new',
        component: AddEditRequisitionTypeComponent,
    },
    {
        path: 'requisition-type/edit/:id',
        component: AddEditRequisitionTypeComponent,
    },
    {
        path: 'requisition-category',
        component: RequisitionCategoryComponent,
    },
    {
        path: 'requisition-category/add-new',
        component: AddEditRequisitionCategoryComponent,
    },
    {
        path: 'requisition-category/edit/:id',
        component: AddEditRequisitionCategoryComponent,
    },
    {
        path: 'requisition-product',
        component: RequisitionProductComponent,
    },
];

@NgModule({
    declarations: [RequisitionTypeComponent, RequisitionCategoryComponent, AddEditRequisitionTypeComponent, AddEditRequisitionCategoryComponent, AddEditRequisitionProductComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(setupRoutes),
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
    ],
})
export class SetupModule {}
