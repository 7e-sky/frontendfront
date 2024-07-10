import {combineReducers} from 'redux';
import commandes from './commandes.reducer';
import commande from './commande.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    commandes,
    commande,
    dialog
});

export default reducer;
