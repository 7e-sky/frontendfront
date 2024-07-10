import * as Actions from '../actions';

const initialState = {
    data: null,
    loading: false,

    searchText: '',
};

const pSecteursReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_SECTEURS:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.SET_DEMANDES_SEARCH_TEXT:
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

export default pSecteursReducer;
