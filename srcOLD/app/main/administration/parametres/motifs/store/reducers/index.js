import {combineReducers} from 'redux';
import motifs from './motifs.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    motifs,
    dialog
});

export default reducer;
