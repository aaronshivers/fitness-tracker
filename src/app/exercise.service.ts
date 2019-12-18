import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromExercise from './exercise/exercise.reducer';
import * as UI from './shared/ui.actions';
import * as Exercises from './exercise/exercise.actions';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  completedExercisesChanged = new Subject<Exercise[]>();
  private currentExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromExercise.State>,
  ) {
  }

  fetchAllExercises(): void {
    this.store.dispatch(new UI.StartLoading());

    this.firebaseSubscriptions.push(
      this
        .db
        .collection('allExercises')
        .snapshotChanges()
        .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Exercise;
            const id = a.payload.doc.id;
            return { id, ...data };
          })),
        )
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Exercises.SetAllExercises(exercises));
          this.store.dispatch(new UI.StopLoading());
        }, () => {
          this.uiService.showSnackbar(
            'Failed to fetch exercises, please try again later.',
            null,
            3000,
          );
          this.exercisesChanged.next(null);
          this.store.dispatch(new UI.StopLoading());
        }),
    );
  }

  cancelSubscriptions() {
    this
      .firebaseSubscriptions
      .forEach(subscription => subscription.unsubscribe());
  }

  getCurrentExercise(): Exercise {
    return { ...this.currentExercise };
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new Exercises.StartExercising(selectedId));
  }

  cancelExercise(progress: number): void {
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * progress / 100,
      calories: this.currentExercise.calories * progress / 100,
      date: new Date(),
      state: 'cancelled',
    });
    this.store.dispatch(new Exercises.StopExercising());
  }

  completeExercise(): void {
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
    this.store.dispatch(new Exercises.StopExercising());
  }

  fetchCompletedOrdCancelledExercises(): void {
    this
      .firebaseSubscriptions
      .push(this.db.collection('completedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Exercises.SetCompletedExercises(exercises));
        }));
  }

  private addDataToDatabase(exercise: Exercise): void {
    this.db.collection('completedExercises').add(exercise);
  }
}

