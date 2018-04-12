import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingDialogComponent } from '../dialogs/stop-training-dialog/stop-training-dialog.component';

import { trainingReducer } from './training.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        StopTrainingDialogComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        // need to import reducer here because module is loaded lasily
        StoreModule.forFeature('training', trainingReducer) // identify trainingReducer by the key 'training'
    ],
    // tells Angular to be prepared to use those components that are not called in routes or inside templates
    entryComponents: [StopTrainingDialogComponent]
})
export class TrainingModule { }
