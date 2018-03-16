import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
    exercises: Observable<Exercise[]>;

    constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

    ngOnInit() {
        this.exercises = this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
            return docArray.map(document => {
                return {
                    id: document.payload.doc.id,
                    name: document.payload.doc.data().name,
                    duration: document.payload.doc.data().duration,
                    calories: document.payload.doc.data().calories,
                };
            });
        });
        // .subscribe(results => {
        //     results.map(result => {
        //         console.log(result);
        //     });
        // });
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

}
