import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceProcessesComponent } from './advice-processes.component';

describe('AdviceProcessesComponent', () => {
  let component: AdviceProcessesComponent;
  let fixture: ComponentFixture<AdviceProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
