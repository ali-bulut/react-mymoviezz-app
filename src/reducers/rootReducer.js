import {combineReducers} from 'redux';

import movies from './movies-reducer';
import admins from './admins-reducer';
import authentication from './authentication-reducer';

export default combineReducers({
    data:movies,
    admins,
    authentication
})