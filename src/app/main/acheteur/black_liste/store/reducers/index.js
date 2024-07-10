import {combineReducers} from 'redux';
import blackListes from './blackListes.reducer';
import dialog from './dialog.reducer';
import searchFournisseur from './searchFournisseur.reducer';
const reducer = combineReducers({
    blackListes,
    dialog,
    searchFournisseur
});

export default reducer;
