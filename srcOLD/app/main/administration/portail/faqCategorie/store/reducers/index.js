import {combineReducers} from 'redux';
import faqCategories from './faqCategories.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    faqCategories,
    dialog
});

export default reducer;
