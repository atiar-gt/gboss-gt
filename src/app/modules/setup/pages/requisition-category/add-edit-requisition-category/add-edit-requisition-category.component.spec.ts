import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequisitionCategoryComponent } from './add-edit-requisition-category.component';

describe('AddEditRequisitionCategoryComponent', () => {
  let component: AddEditRequisitionCategoryComponent;
  let fixture: ComponentFixture<AddEditRequisitionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequisitionCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequisitionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
