import * as Actions from '../actions';

const initialState = {
    loading: false,
    error: '',
};

const resetpasswordReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_RESET_PASS:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case Actions.SUCCESS_RESET_PASS:
            {
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            }
        case Actions.ERROR_RESET_PASS:
            {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
            }

        default:
            {
                return state;
            }
    }
};

export default resetpasswordReducer;
