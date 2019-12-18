import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-exercise.component.html',
  styleUrls: [ './new-exercise.component.css' ],
})
export class NewExerciseComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<{ ui: fromRoot.State }>,
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.exerciseService.fetchAllExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
