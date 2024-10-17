import { TestBed } from '@angular/core/testing';

import { ReportsPresenterService } from './reports.presenter.service';

describe('ReportsPresenterService', () => {
  let service: ReportsPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
