import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './exercise.service';

describe('TrainingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseService = TestBed.get(ExerciseService);
    expect(service).toBeTruthy();
  });
});
