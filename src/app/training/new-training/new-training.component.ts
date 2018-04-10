import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    private exerciseSubscription: Subscription;

    exercises: Exercise[];
    isLoading$: Observable<boolean>;

    constructor(
        private trainingService: TrainingService,
        private uiService: UiService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        this.exerciseSubscription = this.trainingService.exercisesChanged
        .subscribe(exercises => {
            this.exercises = exercises;
        });
        this.fetchExercises();
    }

    fetchExercises() {
        this.trainingService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
        if(this.exerciseSubscription) {
            this.exerciseSubscription.unsubscribe();
        }
    }
}
