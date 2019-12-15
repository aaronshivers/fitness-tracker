import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.css' ],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exercises = this.exerciseService.getExercises();
  }

  onStartTraining() {
    this.exerciseService.startExercise();
  }

}
