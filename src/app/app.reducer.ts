import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// create an interface with "ui" property type of fromUi.State
export interface State {
    ui: fromUi.State;
}

// export all reducers with they type
export const reducers: ActionReducerMap<State> = {
    // uiReducer return the state with the type State ({isLoading: boolean})
    ui: fromUi.uiReducer
};

// get quick access to the ui state thx to ngrx
// return an object
export const getUiState = createFeatureSelector<fromUi.State>('ui');

// get quick access to isLoading state using getIsLoading with ui state from ui reducer
// return a boolean
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
