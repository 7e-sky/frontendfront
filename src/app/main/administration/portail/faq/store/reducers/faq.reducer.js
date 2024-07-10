import * as Actions from '../actions';

const initialState = {
    loading: false,
    requestFaq: false,
    error: null,
    data: null,
    categories: null,
};

const faqReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    loading: false,
                    requestFaq: false,
                    error: null,
                    data: null,
                };
            }
        case Actions.REQUEST_SAVE_FAQ:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_FAQ:
            {
                return {
                    ...state,
                    requestFaq: true,
                };
            }

        case Actions.GET_FAQ:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestFaq: false,
                    error: null


                };
            }
        case Actions.GET_CATEGORIES:
            {
                return {
                    ...state,
                    categories: action.payload,
                };
            }
        case Actions.SAVE_FAQ:
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

export default faqReducer;
