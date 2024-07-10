import {combineReducers} from 'redux';
import conditions from './conditions.reducer';
import condition from './condition.reducer';

const reducer = combineReducers({
    conditions,
    condition,
});

export default reducer;
