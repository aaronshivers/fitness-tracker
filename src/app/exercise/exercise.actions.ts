import { Action } from '@ngrx/store';
import { Exercise } from '../exercise';

export const SET_ALL_EXERCISES = '[Exercise] Set All Exercises';
export const SET_COMPLETED_EXERCISES = '[Exercise] Set Completed Exercises';
export const START_EXERCISING = '[Exercise] Start Exercising';
export const STOP_EXERCISING = '[Exercise] Stop Exercising';

export class SetAllExercises implements Action {
  readonly type = SET_ALL_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class SetCompletedExercises implements Action {
  readonly type = SET_COMPLETED_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class StartExercising implements Action {
  readonly type = START_EXERCISING;

  constructor(public payload: string) {}
}


export class StopExercising implements Action {
  readonly type = STOP_EXERCISING;
}

export type ExerciseActions =
  SetAllExercises
  | SetCompletedExercises
  | StartExercising
  | StopExercising;
