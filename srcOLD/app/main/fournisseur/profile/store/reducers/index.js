import {combineReducers} from 'redux';
import profile from './profile.reducer';
import searchCategories from './searchCategories.reducer';

const reducer = combineReducers({
    profile,
    searchCategories
});

export default reducer;
