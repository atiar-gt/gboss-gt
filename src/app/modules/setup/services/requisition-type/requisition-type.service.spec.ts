import { TestBed } from '@angular/core/testing';

import { RequisitionTypeService } from './requisition-type.service';

describe('RequisitionTypeService', () => {
  let service: RequisitionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
