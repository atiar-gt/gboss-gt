import { TestBed } from '@angular/core/testing';

import { RequisitionCategoryService } from './requisition-category.service';

describe('RequisitionCategoryService', () => {
  let service: RequisitionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
