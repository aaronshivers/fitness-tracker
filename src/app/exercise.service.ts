import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  completedExercisesChanged = new Subject<Exercise[]>();
  private allExercises: Exercise[] = [];
  private currentExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  fetchAllExercises(): void {
    this.firebaseSubscriptions.push(this.db.collection('allExercises').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    ).subscribe((exercises: Exercise[]) => {
      this.uiService.loadingStateChanged.next(false);
      this.allExercises = exercises;
      this.exercisesChanged.next([ ...this.allExercises ]);
    }, error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Failed to fetch exercises, please try again later.', null, 3000);
      this.exercisesChanged.next(null);
    }));
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
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
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * progress / 100,
      calories: this.currentExercise.calories * progress / 100,
      date: new Date(),
      state: 'cancelled',
    });
    this.clearExercise();
  }

  completeExercise(): void {
    this.addDataToDatabase({
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

  fetchCompletedOrdCancelledExercises(): void {
    this.firebaseSubscriptions.push(this.db.collection('completedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.completedExercisesChanged.next(exercises);
    }));
  }

  private addDataToDatabase(exercise: Exercise): void {
    this.db.collection('completedExercises').add(exercise);
  }
}

