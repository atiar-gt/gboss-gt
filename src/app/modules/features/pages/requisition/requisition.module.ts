import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RequisitionComponent } from './requisition.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginatorModule } from 'app/shared/components/paginator/paginator.module';
import { MatRadioModule } from '@angular/material/radio';
import { RequisitionDetailsComponent } from './requisition-details/requisition-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const requisitionRoutes: Route[] = [
    {
        path: '',
        component: RequisitionComponent,
    },
];

@NgModule({
    declarations: [RequisitionComponent, RequisitionDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(requisitionRoutes),
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatTabsModule,
        MatDialogModule,
        MatRadioModule,
        PaginatorModule,
    ],
})
export class RequisitionModule {}
