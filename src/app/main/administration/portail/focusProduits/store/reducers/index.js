import {combineReducers} from 'redux';
import focusProduits from './focusProduits.reducer';
import focusProduit from './focusProduit.reducer';

const reducer = combineReducers({
    focusProduits,
    focusProduit
});

export default reducer;
