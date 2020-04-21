import axios from 'axios';
import {API_BASE} from '../config/env'

export const LOGIN_FULFILLED="LOGIN_FULFILLED";
export const LOGIN_REJECTED="LOGIN_REJECTED";
export const LOGIN_PENDING="LOGIN_PENDING";

export const DELETE_ADMIN_FULFILLED="DELETE_ADMIN_FULFILLED";
export const DELETE_ADMIN_REJECTED="DELETE_ADMIN_REJECTED";
export const DELETE_ADMIN_PENDING="DELETE_ADMIN_PENDING";

export const login = (email,password) => dispatch => Promise.resolve().then(() =>{
    return dispatch({
        type:'LOGIN',
        payload:axios.post(`${API_BASE}/admins/login`, {email,password})
        .then(result => result.data)
    })
})

export function logout(){
    return dispatch => {
        dispatch({
            type:'LOGOUT',
            payload:""
        })
    }
}

export const deleteAdmin = () => (dispatch) => Promise.resolve().then(() => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    return dispatch({
        type: 'DELETE_ADMIN',
        payload: axios.delete(`${API_BASE}/admins/delete/${storedData.adminId}`, 
        { headers: { Authorization: "Bearer " + storedData.token } }
        ).then(result => result.data.deletedAdmin)
    })
})