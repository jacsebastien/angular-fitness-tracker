import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html',
    styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
    // Fetch MatSort directive from the template and store it in "sort" property type of MatSort
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
    // No need to tell that it's an arrau of Exercise, MatTableDataSource automatically assume this
    dataSource = new MatTableDataSource<Exercise>();

    constructor(
        private trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit() {
        // this.dataSource.data = this.trainingService.fetchFinishedExercises();
        this.store.select(fromTraining.getFinishedExercises)
        .subscribe((exercises: Exercise[]) => {
            this.dataSource.data = exercises;
        });

        this.trainingService.fetchFinishedExercises();
    }

    ngAfterViewInit() {
        // Sort the table in function of the property fetched from the template
        // Only accessible after view template generation
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        // remove all spaces and put it il lower case
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
