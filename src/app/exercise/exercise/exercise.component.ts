import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-training',
  templateUrl: './exercise.component.html',
  styleUrls: [ './exercise.component.css' ],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  isExercising = false;
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe((exercise: Exercise) => {
      this.isExercising = !!exercise;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
