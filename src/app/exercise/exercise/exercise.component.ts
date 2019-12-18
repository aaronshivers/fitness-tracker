import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Observable } from 'rxjs';
import * as fromExercise from '../../exercise/exercise.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './exercise.component.html',
  styleUrls: [ './exercise.component.css' ],
})
export class ExerciseComponent implements OnInit {
  isExercising$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromExercise.State>,
  ) { }

  ngOnInit() {
    this.isExercising$ = this.store.select(fromExercise.getIsExercising);
  }
}
