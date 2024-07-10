import {combineReducers} from 'redux';
import fournisseurs from './fournisseurs.reducer';
import fournisseur from './fournisseur.reducer';
import searchCategories from './searchCategories.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    fournisseurs,
    searchCategories,
    fournisseur,
    dialog
});

export default reducer;
