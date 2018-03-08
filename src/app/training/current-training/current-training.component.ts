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
    this.timer = window.setInterval(() => {
      this.progress += 1;

      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 200);
  }

  onStopTraining() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingDialogComponent);
  }

}
