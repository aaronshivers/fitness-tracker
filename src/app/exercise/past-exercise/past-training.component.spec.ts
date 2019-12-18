import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastExerciseComponent } from './past-exercise.component';

describe('PastTrainingComponent', () => {
  let component: PastExerciseComponent;
  let fixture: ComponentFixture<PastExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
