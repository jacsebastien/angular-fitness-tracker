import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// Create typescript classes used by Angular to define start and stop loading
export class SetAuthenticated implements Action {
    // action has a type which is ou constant
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

// type UIActions can be StartLoading or StopLoading classes
export type AuthActions = SetAuthenticated | SetUnauthenticated;
