import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';
import * as fromExercise from '../exercise.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-exercise',
  templateUrl: './past-exercise.component.html',
  styleUrls: [ './past-exercise.component.css' ],
})
export class PastExerciseComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromExercise.State>,
  ) { }

  ngOnInit(): void {
    this
      .store
      .select(fromExercise.getCompletedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });

    this.exerciseService.fetchCompletedOrdCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
