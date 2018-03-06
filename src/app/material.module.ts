import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule
} from '@angular/material';

// Custom module for managing all material modules imports
@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule
    ]
})
export class MaterialModule {}
