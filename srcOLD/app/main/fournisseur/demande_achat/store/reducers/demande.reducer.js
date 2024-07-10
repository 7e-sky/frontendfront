import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    attachement: null,
    visit: null,
    produits: null,
    requestAddProduit: false
};

const demandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_DEMANDE:
        case Actions.REQUEST_VISITE_DEMANDE:
            {
                return {
                    ...state,
                    loading: true,


                }
            }
        case Actions.REQUEST_ADD_PRODUIT:
            {
                return {
                    ...state,
                    requestAddProduit: true,


                }
            }
        case Actions.PRODUITS_ADDED:
            {
                return {
                    ...state,
                    requestAddProduit: true,


                }
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    data: null,
                    visit: null,
                    loading: false,
                    attachement: null,
                    error: null,
                    produits: null

                };
            }
        case Actions.GET_PRODUITS_FRS:
            {
                return {
                    ...state,
                    produits: action.payload,

                };
            }
        case Actions.GET_DEMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.GET_VISITE_DEMANDE:
            {
                return {
                    ...state,
                    visit: action.payload,
                    loading: false,

                };
            }

        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,

                };
            }
        default:
            {
                return state;
            }
    }
};

export default demandeReducer;
