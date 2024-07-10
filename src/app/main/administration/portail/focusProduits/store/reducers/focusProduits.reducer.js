import * as Actions from '../actions';

const initialState = {
    data: [],
    loading: false,
    searchText: '',
};

const focusProduitsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    data: []

                };
            }
        case Actions.REQUEST_PRODUITS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_PRODUITS:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false
                };
            }

        default:
            {
                return state;
            }
    }
};

export default focusProduitsReducer;
