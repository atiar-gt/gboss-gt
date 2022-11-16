import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequisitionProductComponent } from './add-edit-requisition-product.component';

describe('AddEditRequisitionProductComponent', () => {
  let component: AddEditRequisitionProductComponent;
  let fixture: ComponentFixture<AddEditRequisitionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequisitionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequisitionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
