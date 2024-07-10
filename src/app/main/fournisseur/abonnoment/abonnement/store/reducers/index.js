import {combineReducers} from 'redux';
import abonnements from './abonnements.reducer';
import abonnement from './abonnement.reducer';
import dialog from './dialog.reducer';
import commandes from './commandes.reducer';

const reducer = combineReducers({
    abonnements,
    abonnement,
    commandes,
    dialog
});

export default reducer;
