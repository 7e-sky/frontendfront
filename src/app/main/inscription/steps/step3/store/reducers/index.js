import {combineReducers} from 'redux';
import step3 from './step3.reducer';
import searchCategories from './searchCategories.reducer';

const reducer = combineReducers({
    step3,
    searchCategories,
});

export default reducer;
