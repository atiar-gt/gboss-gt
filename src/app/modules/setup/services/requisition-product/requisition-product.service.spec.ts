import { TestBed } from '@angular/core/testing';

import { RequisitionProductService } from './requisition-product.service';

describe('RequisitionProductService', () => {
  let service: RequisitionProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
