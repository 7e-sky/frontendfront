import {combineReducers} from 'redux';
import abonnements from './abonnements.reducer';
import abonnement from './abonnement.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    abonnements,
    abonnement,
    dialog
});

export default reducer;
