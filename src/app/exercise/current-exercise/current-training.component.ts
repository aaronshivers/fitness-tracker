import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopExercisingComponent } from '../stop-exercising/stop-exercising.component';
import { ExerciseService } from '../../exercise.service';
import { Store } from '@ngrx/store';
import * as fromExercise from '../exercise.reducer';
import { Exercise } from '../../exercise';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: [ './current-training.component.css' ],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private store: Store<fromExercise.State>,
  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this
      .store
      .select(fromExercise.getCurrentExercise)
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        const step = exercise.duration / 100 * 1000;

        this.timer = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.exerciseService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopExercisingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
