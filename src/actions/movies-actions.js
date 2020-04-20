import axios from "axios";
import { API_BASE } from "../config/env";

export const FETCH_MOVIES_FULFILLED = "FETCH_MOVIES_FULFILLED";
export const FETCH_MOVIES_REJECTED = "FETCH_MOVIES_REJECTED";
export const FETCH_MOVIES_PENDING = "FETCH_MOVIES_PENDING";

export const FETCH_MOVIES_BY_ADMIN_FULFILLED = "FETCH_MOVIES_BY_ADMIN_FULFILLED";
export const FETCH_MOVIES_BY_ADMIN_REJECTED = "FETCH_MOVIES_BY_ADMIN_REJECTED";
export const FETCH_MOVIES_BY_ADMIN_PENDING = "FETCH_MOVIES_BY_ADMIN_PENDING";

export const ADD_MOVIE_FULFILLED = "ADD_MOVIE_FULFILLED";
export const ADD_MOVIE_REJECTED = "ADD_MOVIE_REJECTED";
export const ADD_MOVIE_PENDING = "ADD_MOVIE_PENDING";

export const EDIT_MOVIE_FULFILLED = "EDIT_MOVIE_FULFILLED";
export const EDIT_MOVIE_REJECTED = "EDIT_MOVIE_REJECTED";
export const EDIT_MOVIE_PENDING = "EDIT_MOVIE_PENDING";

export const DELETE_MOVIE_FULFILLED="DELETE_MOVIE_FULFILLED";
export const DELETE_MOVIE_REJECTED="DELETE_MOVIE_REJECTED";
export const DELETE_MOVIE_PENDING="DELETE_MOVIE_PENDING";

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

export function fetchMoviesByAdmin (adminId) {
  return (dispatch) => {
    dispatch({
      type:'FETCH_MOVIES_BY_ADMIN',
      payload: axios.get(`${API_BASE}/movies/admin/${adminId}`).then(result => result.data.movies)
    })
  }
}

// PROMISE BASED DISPATCH FUNCTION EXP. BY USING THUNK

// export const AddMovie = (data) => (dispatch, getState) =>
//   Promise.resolve().then(() => {
//     return dispatch({
//       type:"",
//       data
//     });
//   });

export const addMovie = (
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
) => (dispatch) =>
  Promise.resolve().then(() => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
      return dispatch({
        type: "ADD_MOVIE",
        payload: axios
          .post(
            `${API_BASE}/movies`,
            {
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
              description,
            },
            { headers: { Authorization: "Bearer " + storedData.token } }
          )
          .then((result) => result.data.movie),
      });
  });


  export const editMovie = (
    movieId,
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
  ) => (dispatch) =>
    Promise.resolve().then(() => {
      const storedData = JSON.parse(localStorage.getItem("adminData"));
        return dispatch({
          type: "EDIT_MOVIE",
          payload: axios
            .patch(
              `${API_BASE}/movies/${movieId}`,
              {
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
                description,
              },
              { headers: { Authorization: "Bearer " + storedData.token } }
            )
            .then((result) => result.data.movie),
        });
    });

    export const deleteMovie = (movieId) => dispatch => Promise.resolve().then(() => {
      const storedData = JSON.parse(localStorage.getItem("adminData"));
      return dispatch({
        type:'DELETE_MOVIE',
        payload:axios
          .delete(`${API_BASE}/movies/${movieId}`, { headers: { Authorization: "Bearer " + storedData.token } })
      })
    })
