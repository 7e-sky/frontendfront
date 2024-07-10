import {combineReducers} from 'redux';
import commande from './commande.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    commande,
    dialog
});

export default reducer;
