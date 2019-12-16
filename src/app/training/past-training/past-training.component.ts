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
  private exercisesChangedSubscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercisesChangedSubscription = this.exerciseService.completedExercisesChanged.subscribe((exercises: Exercise[]) => {
      console.log(exercises);
      this.dataSource.data = exercises;
    });
    this.exerciseService.fetchCompletedOrdCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.exercisesChangedSubscription.unsubscribe();
  }
}
