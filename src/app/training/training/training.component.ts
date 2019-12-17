import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: [ './training.component.css' ],
})
export class TrainingComponent implements OnInit, OnDestroy {
  isTraining = false;
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe((exercise: Exercise) => {
      this.isTraining = !!exercise;
    });
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
