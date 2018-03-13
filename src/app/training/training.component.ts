import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
    ongoingTraining = false;
    exSubscription: Subscription;

    constructor(private trainingService: TrainingService) { }

    ngOnInit() {
        this.exSubscription = this.trainingService.exerciseChanged
        .subscribe(execise => {
            this.ongoingTraining = execise !== null;
        });
    }

    ngOnDestroy() {
        this.exSubscription.unsubscribe();
    }
}
