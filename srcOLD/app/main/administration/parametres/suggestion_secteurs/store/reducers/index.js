import {combineReducers} from 'redux';
import suggestions from './suggestions.reducer';
import suggestion from './suggestion.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    suggestions,
    suggestion,
    dialog
});

export default reducer;
