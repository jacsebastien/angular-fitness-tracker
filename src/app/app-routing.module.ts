import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    // protect training route with custom auth guard
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    /* provide the guard allow it to be used in the application,
    only used here so no need to provide it in app.module */
    providers: [AuthGuard]
})
export class AppRoutingModule {}
