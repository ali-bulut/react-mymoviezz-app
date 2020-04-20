import {
    FETCH_MOVIES_FULFILLED, FETCH_MOVIES_REJECTED, FETCH_MOVIES_PENDING,
    FETCH_MOVIES_BY_ADMIN_FULFILLED, FETCH_MOVIES_BY_ADMIN_REJECTED, FETCH_MOVIES_BY_ADMIN_PENDING,
    ADD_MOVIE_FULFILLED, ADD_MOVIE_REJECTED, ADD_MOVIE_PENDING,
    EDIT_MOVIE_FULFILLED, EDIT_MOVIE_REJECTED, EDIT_MOVIE_PENDING,
    DELETE_MOVIE_FULFILLED, DELETE_MOVIE_REJECTED, DELETE_MOVIE_PENDING
} from '../actions/movies-actions';
import {
    FETCH_MOVIE_FULFILLED, FETCH_MOVIE_REJECTED, FETCH_MOVIE_PENDING
} from '../actions/movie-details-actions';

const initalState={
    fetching:false,
    error:{},
    movies:[],
    movie:{},
    deletedMovie:{}
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

            case FETCH_MOVIES_BY_ADMIN_PENDING:
                return {
                    ...state,
                    fetching:true
                }
            case FETCH_MOVIES_BY_ADMIN_FULFILLED:
                return {
                    ...state,
                    movies:action.payload,
                    fetching:false
                }
            case FETCH_MOVIES_BY_ADMIN_REJECTED:
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

            case ADD_MOVIE_PENDING:
                return {
                    ...state,
                    fetching:true
                }
            case ADD_MOVIE_FULFILLED:
                return {
                    ...state,
                    movie:action.payload,
                    fetching:false
                }
            case ADD_MOVIE_REJECTED:
                return {
                    ...state,
                    error:action.payload,
                    fetching:false
                }

                case EDIT_MOVIE_PENDING:
                    return {
                        ...state,
                        fetching:true
                    }
                case EDIT_MOVIE_FULFILLED:
                    return {
                        ...state,
                        movie:action.payload,
                        fetching:false
                    }
                case EDIT_MOVIE_REJECTED:
                    return {
                        ...state,
                        error:action.payload,
                        fetching:false
                    }
                    case DELETE_MOVIE_PENDING:
                        return {
                            ...state,
                            fetching:true
                        }
                    case DELETE_MOVIE_FULFILLED:
                        return {
                            ...state,
                            deletedMovie:action.payload,
                            fetching:false
                        }
                    case DELETE_MOVIE_REJECTED:
                        return {
                            ...state,
                            error:action.payload,
                            fetching:false
                        }

        default:
            return state;
    }
}