import * as Actions from '../actions';

const initialState = {
    entities: [],
    loading: false,
    searchText: '',
};

const faqsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_FAQS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_FAQS:
            {
                return {
                    ...state,
                    entities: action.payload['hydra:member'],
                    loading: false
                };
            }
        case Actions.SET_FAQS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        default:
            {
                return state;
            }
    }
};

export default faqsReducer;
