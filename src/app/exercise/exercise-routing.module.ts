import { NgModule } from '@angular/core';
import { ExerciseComponent } from './exercise/exercise.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExerciseComponent,
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ExerciseRoutingModule {
}
