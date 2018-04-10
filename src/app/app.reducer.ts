export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false
};

// give state initialState default value cause the first time the app launch we have no state
export function appReducer(state = initialState, action) {
    switch(action.type) {
        case 'START_LOADING' :
            return {
                isLoading: true
            };
        case 'STOP_LOADING' :
            return {
                isLoading: false
            };
        default :
            return state;
    }
}
