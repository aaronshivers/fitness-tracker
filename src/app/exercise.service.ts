import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private exercises: Exercise[] = [
    { id: 'push-ups', name: 'Push Ups', duration: 30, calories: 8 },
    { id: 'pull-ups', name: 'Pull Ups', duration: 60, calories: 8 },
    { id: 'sit-ups', name: 'Sit Ups', duration: 90, calories: 8 },
    { id: 'jogging', name: 'Jogging', duration: 120, calories: 8 },
    { id: 'squats', name: 'Squats', duration: 160, calories: 8 },
  ];

  constructor() { }

  getExercises(): Exercise[] {
    return this.exercises.slice();
  }
}
