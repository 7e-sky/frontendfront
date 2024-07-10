import {combineReducers} from 'redux';
import contactFournisseur from './contactFournisseur.reducer';
import contactsFournisseur from './contactsFournisseur.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    contactsFournisseur,
    contactFournisseur,
    dialog
});

export default reducer;
