import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: [ './current-training.component.css' ],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.exerciseService.getCurrentExercise().duration / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exitTraining.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
