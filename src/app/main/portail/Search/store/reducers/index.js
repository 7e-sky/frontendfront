import {combineReducers} from 'redux';
import globalSearch from './globalSearch.reducer';

const reducer = combineReducers({
    globalSearch,
});

export default reducer;
