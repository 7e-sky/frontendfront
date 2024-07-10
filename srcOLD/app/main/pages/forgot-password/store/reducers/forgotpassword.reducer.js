import * as Actions from '../actions';

const initialState = {
    loading: false,
    error: '',
};

const forgotpasswordReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_RESET:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case Actions.SUCCESS_RESET:
            {
                return {
                    ...state,
                    loading: false,
                    error: ''
                };
            }
        case Actions.ERROR_RESET:
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

export default forgotpasswordReducer;
