import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RequisitionComponent } from './requisition.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

const requisitionRoutes: Route[] = [
    {
        path: '',
        component: RequisitionComponent,
    },
];

@NgModule({
    declarations: [RequisitionComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(requisitionRoutes),
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
    ],
})
export class RequisitionModule {}
