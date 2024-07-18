import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagementComponent } from './adminmanagement.component';

describe('AdminmanagementComponent', () => {
  let component: AdminmanagementComponent;
  let fixture: ComponentFixture<AdminmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
