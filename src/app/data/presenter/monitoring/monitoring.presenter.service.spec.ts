import { TestBed } from '@angular/core/testing';

import { Monitoring.PresenterService } from './monitoring.presenter.service';

describe('Monitoring.PresenterService', () => {
  let service: Monitoring.PresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Monitoring.PresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
