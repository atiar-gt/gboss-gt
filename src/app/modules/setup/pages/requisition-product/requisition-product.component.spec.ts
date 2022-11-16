import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionProductComponent } from './requisition-product.component';

describe('RequisitionProductComponent', () => {
  let component: RequisitionProductComponent;
  let fixture: ComponentFixture<RequisitionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
