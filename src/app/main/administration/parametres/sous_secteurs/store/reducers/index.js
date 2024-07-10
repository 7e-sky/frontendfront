import {combineReducers} from 'redux';
import sous_secteurs from './sous_secteurs.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    sous_secteurs,
    dialog
});

export default reducer;
