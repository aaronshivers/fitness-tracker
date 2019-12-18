import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as fromExercise from '../exercise.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-exercise.component.html',
  styleUrls: [ './new-exercise.component.css' ],
})
export class NewExerciseComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromExercise.State>,
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromExercise.getAllExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.fetchAllExercises();
  }

  onStartExercising(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }
}
