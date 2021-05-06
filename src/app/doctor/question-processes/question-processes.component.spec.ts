import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionProcessesComponent } from './question-processes.component';

describe('QuestionProcessesComponent', () => {
  let component: QuestionProcessesComponent;
  let fixture: ComponentFixture<QuestionProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
