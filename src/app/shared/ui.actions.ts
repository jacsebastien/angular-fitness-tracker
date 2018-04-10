import { Action } from "@ngrx/store";

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

// Create typescript classes used by Angular to define start and stop loading
export class StartLoading implements Action {
    // action has a type which is ou constant
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

// type UIActions can be StartLoading or StopLoading classes
export type UIActions = StartLoading | StopLoading;
