import {combineReducers} from 'redux';
import admins from './admins.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    admins,
    dialog
});

export default reducer;
