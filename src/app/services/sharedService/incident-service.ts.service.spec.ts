import { TestBed } from '@angular/core/testing';

import { IncidentServiceTsService } from './incident-service.ts.service';

describe('IncidentServiceTsService', () => {
  let service: IncidentServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
