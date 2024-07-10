import {combineReducers} from 'redux';
import demandesDevis from './demandesDevis.reducer';
import demandeDevis from './demandeDevis.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    demandesDevis,
    demandeDevis,
    dialog
});

export default reducer;
