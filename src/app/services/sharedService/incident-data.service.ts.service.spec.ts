import { TestBed } from '@angular/core/testing';

import { IncidentDataServiceTsService } from './incident-data.service.ts.service';

describe('IncidentDataServiceTsService', () => {
  let service: IncidentDataServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentDataServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
