import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequisitionTypeComponent } from './add-edit-requisition-type.component';

describe('AddEditRequisitionTypeComponent', () => {
  let component: AddEditRequisitionTypeComponent;
  let fixture: ComponentFixture<AddEditRequisitionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequisitionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequisitionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
