import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisitionComponent } from './requisition/requisition.component';
import { Route, RouterModule } from '@angular/router';

const requisitionRoutes: Route[] = [
  {
    path: '',
    component: RequisitionComponent
  },
];

@NgModule({
  declarations: [
    RequisitionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(requisitionRoutes),
  ]
})
export class RequisitionModule { }
