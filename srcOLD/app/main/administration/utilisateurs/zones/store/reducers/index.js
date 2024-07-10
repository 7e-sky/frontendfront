import {combineReducers} from 'redux';
import zones from './zones.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    zones,
    dialog
});

export default reducer;
