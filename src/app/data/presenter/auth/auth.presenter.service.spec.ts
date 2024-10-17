import { TestBed } from '@angular/core/testing';

import { AuthPresenterService } from './auth.presenter.service';

describe('AuthPresenterService', () => {
  let service: AuthPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
