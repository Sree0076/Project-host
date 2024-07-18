import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentVewPageComponent } from './incident-vew-page.component';

describe('IncidentVewPageComponent', () => {
  let component: IncidentVewPageComponent;
  let fixture: ComponentFixture<IncidentVewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentVewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentVewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
