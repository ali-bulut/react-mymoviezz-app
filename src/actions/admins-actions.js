import axios from "axios";
import { API_BASE } from "../config/env";  

export const FETCH_ADMINS_FULFILLED = "FETCH_ADMINS_FULFILLED";
export const FETCH_ADMINS_REJECTED = "FETCH_ADMINS_REJECTED";
export const FETCH_ADMINS_PENDING = "FETCH_ADMINS_PENDING";

export const FETCH_ADMIN_BY_ID_FULFILLED = "FETCH_ADMIN_BY_ID_FULFILLED";
export const FETCH_ADMIN_BY_ID_REJECTED = "FETCH_ADMIN_BY_ID_REJECTED";
export const FETCH_ADMIN_BY_ID_PENDING = "FETCH_ADMIN_BY_ID_PENDING";

export const UPDATE_ADMIN_FULFILLED = "UPDATE_ADMIN_FULFILLED";
export const UPDATE_ADMIN_REJECTED = "UPDATE_ADMIN_REJECTED";
export const UPDATE_ADMIN_PENDING = "UPDATE_ADMIN_PENDING";

export function fetchAdmins() {
  return (dispatch) => {
    dispatch({
      type: "FETCH_ADMINS",
      payload: axios
        .get(`${API_BASE}/admins`)
        .then((result) => result.data.admins),
    });
  };
}

export const fetchAdminById = (adminId) => (dispatch) => Promise.resolve().then(() => {
    return dispatch({
        type: "FETCH_ADMIN_BY_ID",
        payload: axios
          .get(`${API_BASE}/admins/account/${adminId}`)
          .then((result) => result.data.admin),
      });
})

export const updateAdmin = (fullname, email, password, image) => (dispatch) =>
  Promise.resolve().then(() => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    return dispatch({
      type: "UPDATE_ADMIN",
      payload: axios
        .patch(
          `${API_BASE}/admins/update/${storedData.adminId}`,
          { fullname, email, password, image },
          { headers: { Authorization: "Bearer " + storedData.token } }
        )
        .then((result) => result.data.admin),
    });
  });
