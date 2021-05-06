import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProcessesComponent } from './patient-processes.component';

describe('PatientProcessesComponent', () => {
  let component: PatientProcessesComponent;
  let fixture: ComponentFixture<PatientProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
