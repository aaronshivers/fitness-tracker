import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../exercise';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.css' ],
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any[]>;

  constructor(private exerciseService: ExerciseService, private db: AngularFirestore) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exercises = this.db.collection('allExercises').valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

}
