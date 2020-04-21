import {
    FETCH_ADMINS_FULFILLED, FETCH_ADMINS_REJECTED, FETCH_ADMINS_PENDING,
    FETCH_ADMIN_BY_ID_FULFILLED, FETCH_ADMIN_BY_ID_REJECTED, FETCH_ADMIN_BY_ID_PENDING,
    UPDATE_ADMIN_FULFILLED, UPDATE_ADMIN_REJECTED, UPDATE_ADMIN_PENDING
} from '../actions/admins-actions';

const initalState={
    fetching:false,
    error:{},
    admins:[],
    admin:{}
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

            case FETCH_ADMIN_BY_ID_PENDING:
                return {
                    ...state,
                    fetching:true
                }
            case FETCH_ADMIN_BY_ID_FULFILLED:
                return {
                    ...state,
                    admin:action.payload,
                    fetching:false
                }
            case FETCH_ADMIN_BY_ID_REJECTED:
                return {
                    ...state,
                    error:action.payload,
                    fetching:false
                }
        
            case UPDATE_ADMIN_PENDING:
                return {
                    ...state,
                    fetching:true
                }
            case UPDATE_ADMIN_FULFILLED:
                return {
                    ...state,
                    admin:action.payload,
                    fetching:false
                }
            case UPDATE_ADMIN_REJECTED:
                return {
                    ...state,
                    error:action.payload,
                    fetching:false
                }

        default:
            return state;
    }
}