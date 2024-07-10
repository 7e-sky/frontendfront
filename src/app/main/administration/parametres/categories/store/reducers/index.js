import {combineReducers} from 'redux';
import categories from './categories.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    categories,
    dialog
});

export default reducer;
