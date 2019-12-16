import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private allExercises: Exercise[] = [];
  private currentExercise: Exercise;
  private completedOrCancelledExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) { }

  fetchAllExercises(): void {
    this.db.collection('allExercises').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    ).subscribe((exercises: Exercise[]) => {
      this.allExercises = exercises;
      this.exercisesChanged.next([...this.allExercises]);
    });
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

