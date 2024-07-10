import {combineReducers} from 'redux';
import personnels from './personnels.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    personnels,
    dialog
});

export default reducer;
