import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private fbSubs: Subscription[] = [];

    private availableExercises: Exercise[] = [];
    private runnungExercise: Exercise;
    // private finishedExercises: Exercise[] = [];

    constructor(private db: AngularFirestore) { }

    fetchAvailableExercises() {
        this.fbSubs.push(this.db
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
        })
        .subscribe(
        (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([ ...exercises ]);
        },
        error => {
            console.log(error);
        }));
    }

    startExercise(selectedId: string): void {
        this.runnungExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runnungExercise});
    }

    completeExercise(): void {
        // Store completed exercise in the array and add date and status
        // this.finishedExercises.push({
        this.addDataToDatabase({
            ...this.runnungExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runnungExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number): void {
        // Store cancelled exercise in the array and set calories and duration calculated from progress %
        // this.finishedExercises.push({
        this.addDataToDatabase({
            ...this.runnungExercise,
            duration: this.runnungExercise.duration * (progress / 100),
            calories: this.runnungExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runnungExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(): Exercise {
        return { ...this.runnungExercise };
    }

    fetchFinishedExercises(): void {
        // return [ ...this.finishedExercises ];
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
        (exercises: Exercise[]) => {
            // this.finishedExercises = exercises;
            this.finishedExercisesChanged.next(exercises);
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
