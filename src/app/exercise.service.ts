import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  // private allExercises: Exercise[] = [
  //   { id: 'push-ups', name: 'Push Ups', duration: 30, calories: 8 },
  //   { id: 'pull-ups', name: 'Pull Ups', duration: 60, calories: 8 },
  //   { id: 'sit-ups', name: 'Sit Ups', duration: 90, calories: 8 },
  //   { id: 'jogging', name: 'Jogging', duration: 120, calories: 8 },
  //   { id: 'squats', name: 'Squats', duration: 160, calories: 8 },
  // ];
  private currentExercise: Exercise;
  private completedOrCancelledExercises: Exercise[] = [];

  constructor() { }

  getExercises(): Exercise[] {
    return this.allExercises.slice();
  }

  getCurrentExercise(): Exercise {
    return { ...this.currentExercise };
  }

  startExercise(selectedId: string): void {
    this.currentExercise = this.allExercises.find(exercise => {
      return exercise.id === selectedId;
    });
    this.exerciseChanged.next({
      ...this.currentExercise,
    });
  }

  cancelExercise(progress: number): void {
    this.completedOrCancelledExercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * progress / 100,
      calories: this.currentExercise.calories * progress / 100,
      date: new Date(),
      state: 'cancelled',
    });
    this.clearExercise();
  }

  completeExercise(): void {
    this.completedOrCancelledExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
    this.clearExercise();
  }

  clearExercise(): void {
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrdCancelledExercises(): Exercise[] {
    return this.completedOrCancelledExercises;
  }
}

