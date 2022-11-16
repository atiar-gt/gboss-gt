import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionCategoryComponent } from './requisition-category.component';

describe('RequisitionCategoryComponent', () => {
  let component: RequisitionCategoryComponent;
  let fixture: ComponentFixture<RequisitionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
