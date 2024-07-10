import {combineReducers} from 'redux';
import commandes from './commandes.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    commandes,
    dialog
});

export default reducer;
