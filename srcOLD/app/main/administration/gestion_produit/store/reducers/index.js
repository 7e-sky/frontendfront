import { combineReducers } from 'redux';
import produits from './produits.reducer';
import produit from './produit.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    produits,
    produit,
    dialog
});

export default reducer;
