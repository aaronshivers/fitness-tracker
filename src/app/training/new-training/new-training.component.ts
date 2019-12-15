import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';
import { NgForm } from '@angular/forms';

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

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

}
