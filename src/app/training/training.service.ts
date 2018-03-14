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
    private passedExercises: Exercise[] = [];

    constructor() { }

    getAvailableExercises(): Exercise[] {
        return [ ...this.availableExercises ];
    }

    startExercise(selectedId: string): void {
        this.runnungExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runnungExercise});
    }

    completeExercise(): void {
        // Store completed exercise in the array and add date and status
        this.passedExercises.push({
            ...this.runnungExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runnungExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number): void {
        // Store cancelled exercise in the array and set calories and duration calculated from progress %
        this.passedExercises.push({
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

    getPassedExercises(): Exercise[] {
        return [ ...this.passedExercises ];
    }
}
