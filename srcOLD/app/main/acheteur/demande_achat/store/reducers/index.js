import { combineReducers } from 'redux';
import demandes from './demandes.reducer';
import demande from './demande.reducer';
import searchCategories from './searchCategories.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    demandes,
    demande,
    dialog,
    searchCategories
});

export default reducer;
