import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.css' ],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(private exerciseService: ExerciseService, private uiService: UiService) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fetchExercises() {
    this.exerciseService.fetchAllExercises();
  }
}
