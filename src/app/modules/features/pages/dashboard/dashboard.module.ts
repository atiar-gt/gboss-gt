import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

const dashboardRoute: Route[] = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoute),
        MatDividerModule,
        MatIconModule,
    ],
})
export class DashboardModule {}
