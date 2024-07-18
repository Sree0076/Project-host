import { TestBed } from '@angular/core/testing';

import { IncidentReportFormApiService } from './incident-report-form-api.service';

describe('IncidentReportFormApiService', () => {
  let service: IncidentReportFormApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentReportFormApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
