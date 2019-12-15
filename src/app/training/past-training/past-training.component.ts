import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: [ './past-training.component.css' ],
})
export class PastTrainingComponent implements OnInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.dataSource.data = this.exerciseService.getCompletedOrdCancelledExercises();
  }

}
