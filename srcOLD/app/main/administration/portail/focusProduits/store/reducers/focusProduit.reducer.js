import * as Actions from '../actions';

const initialState = {
    data: null,
    fournisseurs: null,
    categories: null,
    products: null,
    error: null,
    loadingFournisseurs: false,
    loadingProducts: false,
    loading: false,
    success: false,
    imageReqInProgress: false,
    deleteReqInProgress: false,
    image: null,
    image_deleted: null,
};

const focusProduitReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_PRODUIT_SELECTED:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loadingProducts: true,

                }
            }
        case Actions.REQUEST_FOURNISSEUR_SELECTED:
            {
                return {
                    ...state,
                    loadingFournisseurs: true,
                    categories: null,
                }
            }
        case Actions.REQUEST_PRODUCTS_F:
            {
                return {
                    ...state,
                    loadingProducts: true,
                    products: null,
                }
            }
        case Actions.GET_PRODUCTS_F:
            {
                return {
                    ...state,
                    products: action.payload,
                    loadingProducts: false,

                };
            }
        case Actions.GET_FOURNISSEUR_SELECTED:
            {
                return {
                    ...state,
                    fournisseurs: action.payload,
                    loadingFournisseurs: false,

                };
            }
        case Actions.GET_CATEGORIE_SELECTED:
            {
                return {
                    ...state,
                    categories: action.payload,

                };
            }
        case Actions.GET_PRODUIT_SELECTED:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.SAVE_PRODUIT_SELECTED:
            {
                return {
                    ...state,
                    data: action.payload,
                    loadingProducts: false,
                    success: true
                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default focusProduitReducer;
