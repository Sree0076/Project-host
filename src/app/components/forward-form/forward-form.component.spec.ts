import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardFormComponent } from './forward-form.component';

describe('ForwardFormComponent', () => {
  let component: ForwardFormComponent;
  let fixture: ComponentFixture<ForwardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
