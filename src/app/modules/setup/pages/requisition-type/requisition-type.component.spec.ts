import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionTypeComponent } from './requisition-type.component';

describe('RequisitionTypeComponent', () => {
  let component: RequisitionTypeComponent;
  let fixture: ComponentFixture<RequisitionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
