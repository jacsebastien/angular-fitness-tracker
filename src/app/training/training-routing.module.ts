import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TrainingComponent } from "./training.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
        // protect training route with custom auth guard
        // use root path because 'training' path is defined in app-routing
        { path: '', component: TrainingComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule {}
