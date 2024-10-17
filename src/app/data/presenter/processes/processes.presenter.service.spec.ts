import { TestBed } from '@angular/core/testing';

import { ProcessesPresenterService } from './processes.presenter.service';

describe('ProcessesPresenterService', () => {
  let service: ProcessesPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessesPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
