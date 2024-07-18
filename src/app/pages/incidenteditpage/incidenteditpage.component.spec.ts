import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteditpageComponent } from './incidenteditpage.component';

describe('IncidenteditpageComponent', () => {
  let component: IncidenteditpageComponent;
  let fixture: ComponentFixture<IncidenteditpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenteditpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenteditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
