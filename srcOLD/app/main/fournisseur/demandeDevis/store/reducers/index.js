import {combineReducers} from 'redux';
import demandesDevis from './demandesDevis.reducer';
import demandeDevis from './demandeDevis.reducer';

const reducer = combineReducers({
    demandesDevis,
    demandeDevis
});

export default reducer;
