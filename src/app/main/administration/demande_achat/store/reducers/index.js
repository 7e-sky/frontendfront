import { combineReducers } from 'redux';
import demandes from './demandes.reducer';
import demande from './demande.reducer';
import dialog from './dialog.reducer';
import searchCategories from './searchCategories.reducer';

const reducer = combineReducers({
    demandes,
    demande,
    searchCategories,
    dialog
});

export default reducer;
