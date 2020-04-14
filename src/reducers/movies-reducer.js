import {
    FETCH_MOVIES_FULFILLED, FETCH_MOVIES_REJECTED, FETCH_MOVIES_PENDING
} from '../actions/movies-actions';

const initalState={
    fetching:false,
    error:{},
    movies:[]
};


export default (state=initalState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_PENDING:
            return {
                ...state,
                fetching:true
            }
        case FETCH_MOVIES_FULFILLED:
            return {
                ...state,
                movies:action.payload,
                fetching:false
            }
        case FETCH_MOVIES_REJECTED:
            return {
                ...state,
                error:action.payload,
                fetching:false
            }

        default:
            return state;
    }
}