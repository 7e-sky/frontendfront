import {combineReducers} from 'redux';
import faqs from './faqs.reducer';
import faq from './faq.reducer';

const reducer = combineReducers({
    faqs,
    faq,
});

export default reducer;
