import { TestBed } from '@angular/core/testing';

import { AuditPresenterService } from './audit.presenter.service';

describe('Audit.PresenterService', () => {
  let service: AuditPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
