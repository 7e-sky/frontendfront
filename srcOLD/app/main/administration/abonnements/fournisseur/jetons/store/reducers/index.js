import {combineReducers} from 'redux';
import jetons from './jetons.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    jetons,
    dialog
});

export default reducer;
