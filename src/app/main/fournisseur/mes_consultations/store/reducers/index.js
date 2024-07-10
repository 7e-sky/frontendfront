import {combineReducers} from 'redux';
import consultations from './consultations.reducer';
import consultation from './consultation.reducer';

const reducer = combineReducers({
    consultations,
    consultation
});

export default reducer;
