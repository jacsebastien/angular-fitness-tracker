import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { UiService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UiService,
        private store: Store<fromTraining.State>  // give access to training reducer AND to global reducer cause it extends fromRoot
    ) { }

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());

        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
            // throw(new Error());
            return docArray.map(document => {
                return {
                    id: document.payload.doc.id,
                    name: document.payload.doc.data().name,
                    duration: document.payload.doc.data().duration,
                    calories: document.payload.doc.data().calories,
                };
            });
        })
        .subscribe(
        (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        },
        error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
                "Fetching exercises failed, please try again later",
                null,
                3000
            );
        }));
    }

    startExercise(selectedId: string): void {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise(): void {
        // No need to be informed each time active training changed, just need it once
        this.store.select(fromTraining.getActiveTraining).pipe(take(1))
        .subscribe(runnungExercise => {
            // Store completed exercise in the array and add date and status
            this.addDataToDatabase({
                ...runnungExercise,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelExercise(progress: number): void {
        // No need to be informed each time active training changed, just need it once
        this.store.select(fromTraining.getActiveTraining).pipe(take(1))
        .subscribe(runnungExercise => {
            // Store cancelled exercise in the array and set calories and duration calculated from progress %
            this.addDataToDatabase({
                ...runnungExercise,
                duration: runnungExercise.duration * (progress / 100),
                calories: runnungExercise.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    fetchFinishedExercises(): void {
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
        (exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        },
        error => {
            console.log(error);
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db
        .collection('finishedExercises')
        .add(exercise);
    }
}
