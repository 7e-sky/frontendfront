import {combineReducers} from 'redux';
import actualite from './actualite.reducer';
import news from './news.reducer';

const reducer = combineReducers({
    actualite,
    news
});

export default reducer;
