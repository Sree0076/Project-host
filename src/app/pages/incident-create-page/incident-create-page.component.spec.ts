import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCreatePageComponent } from './incident-create-page.component';

describe('IncidentCreatePageComponent', () => {
  let component: IncidentCreatePageComponent;
  let fixture: ComponentFixture<IncidentCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
