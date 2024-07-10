import {combineReducers} from 'redux';
import secteurs from './secteurs.reducer';
import secteur from './secteur.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    secteurs,
    secteur,
    dialog
});

export default reducer;
