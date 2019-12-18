import {
  ExerciseActions,
  SET_ALL_EXERCISES,
  SET_COMPLETED_EXERCISES,
  START_EXERCISING,
  STOP_EXERCISING,
} from './training.actions';
import { Exercise } from '../exercise';
import * as fromRoot from '../app.reducer';

export interface ExerciseState {
  allExercises: Exercise[];
  completedExercises: Exercise[];
  currentExercise: Exercise;
}

export interface State extends fromRoot.State {
  exercise: ExerciseState;
}

const initialState: ExerciseState = {
  allExercises: [],
  completedExercises: [],
  currentExercise: null,
};

export const exerciseReducer = (state: ExerciseState = initialState, action: ExerciseActions) => {
  switch (action.type) {
    case SET_ALL_EXERCISES:
      return {
        ...state,
        allExercises: action.payload,
      };
    case SET_COMPLETED_EXERCISES:
      return {
        ...state,
        completedExercises: action.payload,
      };
    case START_EXERCISING:
      return {
        ...state,
        currentExercise: action.payload,
      };
    case STOP_EXERCISING:
      return {
        ...state,
        currentExercise: null,
      };
    default:
      return state;
  }
};

export const getAllExercises = (state: ExerciseState) => state.allExercises;
export const getCompletedExercises = (state: ExerciseState) => state.completedExercises;
export const getCurrentExercise = (state: ExerciseState) => state.currentExercise;
