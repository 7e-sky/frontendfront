import {combineReducers} from 'redux';
import actualites from './actualites.reducer';
import actualite from './actualite.reducer';

const reducer = combineReducers({
    actualites,
    actualite
});

export default reducer;
