import {combineReducers} from 'redux';
import forgotpassword from './forgotpassword.reducer';
import resetpassword from './resetpassword.reducer';

const reducer = combineReducers({
    forgotpassword,
    resetpassword,
});

export default reducer;
