import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditApprovalWorkflowComponent } from './add-edit-approval-workflow.component';

describe('AddEditApprovalWorkflowComponent', () => {
  let component: AddEditApprovalWorkflowComponent;
  let fixture: ComponentFixture<AddEditApprovalWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditApprovalWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditApprovalWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
