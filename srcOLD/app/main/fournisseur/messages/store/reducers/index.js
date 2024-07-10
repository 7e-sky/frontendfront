import {combineReducers} from 'redux';
import messages from './messages.reducer';
import message from './message.reducer';

const reducer = combineReducers({
    messages,
    message
});

export default reducer;
