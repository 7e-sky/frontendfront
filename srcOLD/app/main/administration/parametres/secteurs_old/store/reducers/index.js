import {combineReducers} from 'redux';
import secteurs from './secteurs.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    secteurs,
    dialog
});

export default reducer;
