import { NgModule } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';
import { CurrentTrainingComponent } from './current-exercise/current-training.component';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { PastExerciseComponent } from './past-exercise/past-exercise.component';
import { StopExercisingComponent } from './stop-exercising/stop-exercising.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { exerciseReducer } from './exercise.reducer';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    ExerciseComponent,
    CurrentTrainingComponent,
    NewExerciseComponent,
    PastExerciseComponent,
    StopExercisingComponent,
  ],
  imports: [
    AngularFirestoreModule,
    FormsModule,
    SharedModule,
    ExerciseRoutingModule,
    StoreModule.forFeature('exercise', exerciseReducer),
  ],
  entryComponents: [ StopExercisingComponent ],
})
export class ExerciseModule {
}
