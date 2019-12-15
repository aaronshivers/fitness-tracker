import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.css' ],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<boolean>();
  exercises: Exercise[] = [
    { value: 'push-ups', viewValue: 'Push Ups' },
    { value: 'pull-ups', viewValue: 'Pull Ups' },
    { value: 'sit-ups', viewValue: 'Sit Ups' },
    { value: 'jogging', viewValue: 'Jogging' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.startTraining.emit();
  }
}
