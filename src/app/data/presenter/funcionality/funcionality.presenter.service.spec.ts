import { TestBed } from '@angular/core/testing';

import { FuncionalityPresenterService } from './funcionality.presenter.service';

describe('FuncionalityPresenterService', () => {
  let service: FuncionalityPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionalityPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
