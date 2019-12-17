import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: [ './past-training.component.css' ],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = [ 'date', 'name', 'duration', 'calories', 'state' ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private exercisesChangedSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercisesChangedSubscription = this.exerciseService.completedExercisesChanged.subscribe((exercises: Exercise[]) => {
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

  ngOnDestroy(): void {
    if (this.exercisesChangedSubscription) {
      this.exercisesChangedSubscription.unsubscribe();
    }
  }
}
