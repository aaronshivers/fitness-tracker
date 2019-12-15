import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: [ './past-training.component.css' ],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.dataSource.data = this.exerciseService.getCompletedOrdCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
