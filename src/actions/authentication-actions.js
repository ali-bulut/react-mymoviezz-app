import axios from 'axios';
import {API_BASE} from '../config/env'

export const LOGIN_FULFILLED="LOGIN_FULFILLED";
export const LOGIN_REJECTED="LOGIN_REJECTED";
export const LOGIN_PENDING="LOGIN_PENDING";

export function login(email,password){
    return dispatch => {
        dispatch({
            type:'LOGIN',
            payload:axios.post(`${API_BASE}/admins/login`, {email,password})
            .then(result => result.data)
        })
    }
}

export function logout(){
    return dispatch => {
        dispatch({
            type:'LOGOUT',
            payload:""
        })
    }
}