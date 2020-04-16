import axios from 'axios';
import {API_BASE} from '../config/env'

export const FETCH_ADMINS_FULFILLED="FETCH_ADMINS_FULFILLED";
export const FETCH_ADMINS_REJECTED="FETCH_ADMINS_REJECTED";
export const FETCH_ADMINS_PENDING="FETCH_ADMINS_PENDING";

export function fetchAdmins(){
    return dispatch => {
        dispatch({
            type:'FETCH_ADMINS',
            payload:axios.get(`${API_BASE}/admins`)
            .then(result => result.data.admins)
        })
    }
}