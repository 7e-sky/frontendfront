import {combineReducers} from 'redux';
import demande from './demande.reducer';
import demandes from './demandes.reducer';

const reducer = combineReducers({
    demande,
    demandes
});

export default reducer;
