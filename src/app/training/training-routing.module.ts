import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TrainingComponent } from "./training.component";

const routes: Routes = [
    // use root path because 'training' path is defined in app-routing
    { path: '', component: TrainingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule {}
