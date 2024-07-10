import * as Actions from '../actions';

const initialState = {

    data: [],
    loading: false,
   
};

const faqsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_FAQS:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.GET_FAQS:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload['hydra:member'],

                };
            }
        default:
            {
                return state;
            }
    }
};

export default faqsReducer;
