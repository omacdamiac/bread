import { TestBed } from '@angular/core/testing';

import { SecurityPresenterService } from './security.presenter.service';

describe('SecurityPresenterService', () => {
  let service: SecurityPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
