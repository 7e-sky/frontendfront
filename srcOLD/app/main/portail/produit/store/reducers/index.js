import {combineReducers} from 'redux';
import detailProduit from './detailProduit.reducer';
import produits from './produits.reducer';

const reducer = combineReducers({
    detailProduit,
    produits
});

export default reducer;
