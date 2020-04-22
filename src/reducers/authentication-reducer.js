import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGIN_PENDING,
  DELETE_ADMIN_FULFILLED,
  DELETE_ADMIN_REJECTED,
  DELETE_ADMIN_PENDING,
} from "../actions/authentication-actions";

const initalState = {
  fetching: false,
  error: null,
  adminId: null,
  email: null,
  fullname: null,
  token: null,
  localStorage: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_FULFILLED:
      const date = new Date();
      date.setHours(date.getHours() + 1);
      const newDate = new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
      return {
        ...state,
        adminId: action.payload.adminId,
        email: action.payload.email,
        fullname: action.payload.fullname,
        token: action.payload.token,
        fetching: false,
        localStorage: localStorage.setItem(
          "adminData",
          JSON.stringify({
            adminId: action.payload.adminId,
            email: action.payload.email,
            fullname: action.payload.fullname,
            token: action.payload.token,
            expireDate: newDate,
          })
        ),
      };

    case LOGIN_REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };

    case "LOGOUT":
      return {
        ...state,
        adminId: null,
        email: null,
        fullname: null,
        token: null,
        fetching: false,
        localStorage: localStorage.removeItem("adminData"),
      };

    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        adminId: null,
        email: null,
        fullname: null,
        token: null,
        fetching: false,
        localStorage: localStorage.removeItem("adminData"),
      };

    case DELETE_ADMIN_REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };

    default:
      return state;
  }
};
