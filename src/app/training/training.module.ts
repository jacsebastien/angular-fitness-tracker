import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingDialogComponent } from '../dialogs/stop-training-dialog/stop-training-dialog.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        CurrentTrainingComponent,
        StopTrainingDialogComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule,
        TrainingRoutingModule
    ],
    // tells Angular to be prepared to use those components that are not called in routes or inside templates
    entryComponents: [StopTrainingDialogComponent]
})
export class TrainingModule { }
