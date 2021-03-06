import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { Subscription } from 'rxjs/Subscription';
import { UiService } from '../../shared/ui.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    private loadingSubscription: Subscription;
    private exerciseSubscription: Subscription;

    exercises: Exercise[];
    isLoading = true;

    constructor(private trainingService: TrainingService, private uiService: UiService) { }

    ngOnInit() {
        this.loadingSubscription = this.uiService.loadingStateChanged
        .subscribe(loadingState => {
            this.isLoading = loadingState;
        });

        this.exerciseSubscription = this.trainingService.exercisesChanged
        .subscribe(exercises => {
            this.exercises = exercises;
            // this.isLoading = false;
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
        if(this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
}
