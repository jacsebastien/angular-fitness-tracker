import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAUth from './auth/auth.reducer';

// create a State interface with "ui" property type of fromUi.State
export interface State {
    ui: fromUi.State;
    auth: fromAUth.State;
}

// export all reducers
export const reducers: ActionReducerMap<State> = {
    // uiReducer return the state with the type State ({isLoading: boolean})
    ui: fromUi.uiReducer,
    auth: fromAUth.authReducer
};

// All this selectors are optional we can acces values manually but it's easier to access to is like this
// ===============================

// get quick access to the ui state thx to ngrx
// return an object
export const getUiState = createFeatureSelector<fromUi.State>('ui');

// get quick access to isLoading state using getIsLoading with ui state from ui reducer
// return a boolean
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAUthState = createFeatureSelector<fromAUth.State>('auth');
export const getIsAuth = createSelector(getAUthState, fromAUth.getIsAuth);

