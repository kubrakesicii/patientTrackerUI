import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentProcessesComponent } from './appointment-processes.component';

describe('AppointmentProcessesComponent', () => {
  let component: AppointmentProcessesComponent;
  let fixture: ComponentFixture<AppointmentProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
