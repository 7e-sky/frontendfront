import {combineReducers} from 'redux';
import admins from './admins.reducer';
import admin from './admin.reducer';

const reducer = combineReducers({
    admins,
    admin
});

export default reducer;
