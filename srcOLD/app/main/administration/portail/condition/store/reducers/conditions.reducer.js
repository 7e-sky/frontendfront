import * as Actions from '../actions';

const initialState = {
    entities: [],
    loading: false,
    searchText: '',
};

const conditionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_CONDITIONS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_CONDITIONS:
            {
                return {
                    ...state,
                    entities: action.payload['hydra:member'],
                    loading: false
                };
            }
        case Actions.SET_CONDITIONS_SEARCH_TEXT:
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

export default conditionsReducer;
