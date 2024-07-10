import {combineReducers} from 'redux';
import commercials from './commercials.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    commercials,
    dialog
});

export default reducer;
