import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
    availableExercises: Exercise[] = [
        
    ];

    constructor() { }

}
