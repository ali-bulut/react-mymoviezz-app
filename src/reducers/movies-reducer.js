import {
    FETCH_MOVIES_FULFILLED, FETCH_MOVIES_REJECTED, FETCH_MOVIES_PENDING
} from '../actions/movies-actions';
import {
    FETCH_MOVIE_FULFILLED, FETCH_MOVIE_REJECTED, FETCH_MOVIE_PENDING
} from '../actions/movie-details-actions';

const initalState={
    fetching:false,
    error:{},
    movies:[],
    movie:{}
};


export default (state=initalState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_PENDING:
            return {
                ...state,
                fetching:true
            }
        case FETCH_MOVIES_FULFILLED:
            return {
                ...state,
                movies:action.payload,
                fetching:false
            }
        case FETCH_MOVIES_REJECTED:
            return {
                ...state,
                error:action.payload,
                fetching:false
            }

            case FETCH_MOVIE_PENDING:
            return {
                ...state,
                fetching:true
            }
        case FETCH_MOVIE_FULFILLED:
            return {
                ...state,
                movie:action.payload,
                fetching:false
            }
        case FETCH_MOVIE_REJECTED:
            return {
                ...state,
                error:action.payload,
                fetching:false
            }

        default:
            return state;
    }
}