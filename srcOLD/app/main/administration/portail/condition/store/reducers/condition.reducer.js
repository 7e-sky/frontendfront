import * as Actions from '../actions';

const initialState = {
    loading: false,
    requestCondition: false,
    error: null,
    data: null,
};

const conditionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    loading: false,
                    requestCondition: false,
                    error: null,
                    data: null,
                };
            }
        case Actions.REQUEST_SAVE_CONDITION:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_CONDITION:
            {
                return {
                    ...state,
                    requestCondition: true,
                };
            }

        case Actions.GET_CONDITION:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestCondition: false,
                    error: null


                };
            }
        case Actions.SAVE_CONDITION:
            {
                return {
                    ...state,
                    loading: false,
                    error: null

                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            }
        default:
            {
                return state;
            }
    }
};

export default conditionReducer;
