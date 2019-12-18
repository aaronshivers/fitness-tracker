import {
  ExerciseActions,
  SET_ALL_EXERCISES,
  SET_COMPLETED_EXERCISES,
  START_EXERCISING,
  STOP_EXERCISING,
} from './exercise.actions';
import { Exercise } from '../exercise';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export function exerciseReducer(state: ExerciseState = initialState, action: ExerciseActions) {
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
        currentExercise: {
          ...state.allExercises.find((exercise: Exercise) => {
            return exercise.id === action.payload;
          })
        },
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

export const getExerciseState = createFeatureSelector<ExerciseState>('exercise');

export const getAllExercises = createSelector(getExerciseState, (state: ExerciseState) => state.allExercises);
export const getCompletedExercises = createSelector (getExerciseState, (state: ExerciseState) => state.completedExercises);
export const getCurrentExercise = createSelector(getExerciseState, (state: ExerciseState) => state.currentExercise);
export const getIsExercising = createSelector(getExerciseState, (state: ExerciseState) => state.currentExercise != null);

