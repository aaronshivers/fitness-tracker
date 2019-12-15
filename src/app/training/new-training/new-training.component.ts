import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.css' ],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<boolean>();
  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exercises = this.exerciseService.getExercises();
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}
