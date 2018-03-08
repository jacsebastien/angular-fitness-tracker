import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopTrainingDialogComponent } from '../../dialogs/stop-training-dialog/stop-training-dialog.component';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0;
    timer: number;

    constructor(private dialog: MatDialog) { }

    ngOnInit() {
        // Start a timer and store it inside timer property for future use
        this.timer = window.setInterval(() => {
            this.progress += 1;

            if (this.progress >= 100) {
                // Stop the timer
                clearInterval(this.timer);
            }
        }, 200);
    }

    onStopTraining() {
        // Stop the timer
        clearInterval(this.timer);

        // Open material dialog and store his ref inside a property
        const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
            // Send data to the dialog
            data: {
                progress: this.progress
            }
        });

        // Material dialog use observables that fires whenever it's closed
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

}
