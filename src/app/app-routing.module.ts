import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    // use lazy loading for training module
    { path: 'training', loadChildren: './training/training.module#TrainingModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    /* provide the guard allow it to be used in the application,
    only used here so no need to provide it in app.module */
    providers: [AuthGuard]
})
export class AppRoutingModule {}
