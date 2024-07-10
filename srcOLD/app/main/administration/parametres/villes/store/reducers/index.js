import {combineReducers} from 'redux';
import villes from './villes.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    villes,
    dialog
});

export default reducer;
