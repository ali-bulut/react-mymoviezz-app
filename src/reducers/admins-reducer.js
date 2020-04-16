import {
    FETCH_ADMINS_FULFILLED, FETCH_ADMINS_REJECTED, FETCH_ADMINS_PENDING
} from '../actions/admins-actions';

const initalState={
    fetching:false,
    error:{},
    admins:[]
};


export default (state=initalState, action) => {
    switch (action.type) {
        case FETCH_ADMINS_PENDING:
            return {
                ...state,
                fetching:true
            }
        case FETCH_ADMINS_FULFILLED:
            return {
                ...state,
                admins:action.payload,
                fetching:false
            }
        case FETCH_ADMINS_REJECTED:
            return {
                ...state,
                error:action.payload,
                fetching:false
            }

        default:
            return state;
    }
}