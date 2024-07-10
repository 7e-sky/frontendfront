import {combineReducers} from 'redux';
import fournisseur from './fournisseur.reducer';
import fournisseurs from './fournisseurs.reducer';

const reducer = combineReducers({
    fournisseur,
    fournisseurs
});

export default reducer;
