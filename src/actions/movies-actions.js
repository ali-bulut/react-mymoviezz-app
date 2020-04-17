import axios from "axios";
import { API_BASE } from "../config/env";

export const FETCH_MOVIES_FULFILLED = "FETCH_MOVIES_FULFILLED";
export const FETCH_MOVIES_REJECTED = "FETCH_MOVIES_REJECTED";
export const FETCH_MOVIES_PENDING = "FETCH_MOVIES_PENDING";

export const ADD_MOVIE_FULFILLED = "ADD_MOVIE_FULFILLED";
export const ADD_MOVIE_REJECTED = "ADD_MOVIE_REJECTED";
export const ADD_MOVIE_PENDING = "ADD_MOVIE_PENDING";

// export const DELETE_MOVIE_FULFILLED="DELETE_MOVIE_FULFILLED";
// export const DELETE_MOVIE_REJECTED="DELETE_MOVIE_REJECTED";
// export const DELETE_MOVIE_PENDING="DELETE_MOVIE_PENDING";

export function fetchMovies() {
  return (dispatch) => {
    dispatch({
      type: "FETCH_MOVIES",
      payload: axios
        .get(`${API_BASE}/movies`)
        .then((result) => result.data.movies),
    });
  };
}

export function addMovie(
  name,
  downloadUrl,
  imageUrl,
  trailerUrl,
  director,
  country,
  genre,
  imdbPoint,
  duration,
  publishedDate,
  description
) {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
  return (dispatch) => {
    dispatch({
      type: "ADD_MOVIE",
      payload: axios
        .post(`${API_BASE}/movies`, {
          name,
          downloadUrl,
          imageUrl,
          trailerUrl,
          director,
          country,
          genre,
          imdbPoint,
          duration,
          publishedDate,
          description 
        }, {headers: {Authorization:'Bearer ' + storedData.token}})
        .then((result) => result.data.movie)
    });
  };
}

// export function deleteMovie(_id){
//     return dispatch => {
//         dispatch({
//             type:'DELETE_MOVIE',
//             payload:axios.delete(`${API_BASE}/movies/${_id}`)
//                 .then(result => Object.assign({}, result, {_id}))
//         })
//     }
// }
