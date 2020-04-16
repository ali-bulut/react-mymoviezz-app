import {
    LOGIN_FULFILLED, LOGIN_REJECTED, LOGIN_PENDING
} from '../actions/authentication-actions';

const initalState={
    fetching:false,
    error:null,
    adminId:null,
    email:null,
    fullname:null,
    token:null
};


export default (state=initalState, action) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                fetching:true
            }
        case LOGIN_FULFILLED:
            localStorage.setItem(
                "adminData",
                JSON.stringify({
                  email: action.payload.email,
                  fullname: action.payload.fullname,
                  token: action.payload.token,
                })
              );
            return {
                ...state,
                adminId:action.payload.adminId,
                email:action.payload.email,
                fullname:action.payload.fullname,
                token:action.payload.token,
                fetching:false
            }
            
        case LOGIN_REJECTED:
            return {
                ...state,
                error:action.payload,
                fetching:false
            }

            case "LOGOUT":
            localStorage.removeItem("adminData");
            return {
                ...state,
                adminId:null,
                email:null,
                fullname:null,
                token:null,
                fetching:false
            }

        default:
            return state;
    }
}