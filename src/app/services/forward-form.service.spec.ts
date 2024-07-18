import { TestBed } from '@angular/core/testing';

import { ForwardFormService } from './forward-form.service';

describe('ForwardFormService', () => {
  let service: ForwardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
