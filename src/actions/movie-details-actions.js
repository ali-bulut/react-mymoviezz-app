import axios from 'axios';
import {API_BASE} from '../config/env'

export const FETCH_MOVIE_FULFILLED="FETCH_MOVIE_FULFILLED";
export const FETCH_MOVIE_REJECTED="FETCH_MOVIE_REJECTED";
export const FETCH_MOVIE_PENDING="FETCH_MOVIE_PENDING";

// export const DELETE_MOVIE_FULFILLED="DELETE_MOVIE_FULFILLED";
// export const DELETE_MOVIE_REJECTED="DELETE_MOVIE_REJECTED";
// export const DELETE_MOVIE_PENDING="DELETE_MOVIE_PENDING";

export function fetchMovieById(movieId){
    return dispatch => {
        dispatch({
            type:'FETCH_MOVIE',
            payload:axios.get(`${API_BASE}/movies/${movieId}`)
            .then(result => result.data.movie)
        })
    }
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