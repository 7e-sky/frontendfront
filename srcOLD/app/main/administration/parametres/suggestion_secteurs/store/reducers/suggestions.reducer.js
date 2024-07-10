import * as Actions from '../actions';

const initialState = {
    entities: [],
    loading: false,
    searchText: '',
};

const suggestionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_SUGGESTIONS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_SUGGESTIONS:
            {
                return {
                    ...state,
                    entities: action.payload['hydra:member'],
                    loading: false
                };
            }
        case Actions.SET_SUGGESTIONS_SEARCH_TEXT:
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

export default suggestionsReducer;
