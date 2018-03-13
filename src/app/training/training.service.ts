import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runnungExercise: Exercise;

    constructor() { }

    getExercises(): Exercise[] {
        return [ ...this.availableExercises ];
    }

    startExercise(selectedId: string) {
        this.runnungExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runnungExercise});
    }

    getRunningExercise(): Exercise {
        return { ...this.runnungExercise };
    }
}
