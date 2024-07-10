import {combineReducers} from 'redux';
import pays from './pays.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    pays,
    dialog
});

export default reducer;
