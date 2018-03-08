import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training-dialog',
  templateUrl: './stop-training-dialog.component.html',
  styleUrls: ['./stop-training-dialog.component.css']
})
export class StopTrainingDialogComponent implements OnInit {
  // get programatically passed data using angular material service
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: {progress: number}) { }

  ngOnInit() {
  }

}
