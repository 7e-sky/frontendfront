import * as Actions from '../actions';

const initialState = {
    secteurs: null,
    sousSecteurs: null,
    loadingSecteurs: false,
    loadingSousSecteurs: false,
};

const categoriesNavigationReducer = function (state = initialState, action) {
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
                    loadingSecteurs: true,
                };
            }
        case Actions.REQUEST_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    loadingSousSecteurs: true,
                };
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    loadingSecteurs: false,
                    secteurs: action.payload

                };
            }
        case Actions.GET_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    loadingSousSecteurs: false,
                    sousSecteurs: action.payload

                };
            }

        default:
            {
                return state;
            }
    }
};

export default categoriesNavigationReducer;
