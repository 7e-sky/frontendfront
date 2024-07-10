import * as Actions from '../actions';

const initialState = {
    data: [],
    produitsSimilaires: [],
    loadingPS: false,
    loadingsDevis: false,
    loading: false,
    loadingsPhone: false,
    showPhone: false,
    error: null,
    phone: null,
    demandeDevisDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const detailProduitReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SAVE_ERROR_GET:
            {
                return {
                    ...state,
                    loading: false
                }
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }
        case Actions.CLEAN_ERROR:
            {
                return {
                    ...state,
                    error: null,
                };
            }
        case Actions.REQUEST_PRODUIT:
            {
                return {
                    ...state,
                    loading: true,
                    showPhone: false,
                    error: null,
                    phone: null,


                };
            }
        case Actions.REQUEST_UPDATE_PRODUIT:
            {
                return {
                    ...state,
                    loadingsPhone: true,
                    showPhone: false,

                };
            }
        case Actions.REQUEST_PRODUITS_SIMILAIRES:
            {
                return {
                    ...state,
                    loadingPS: true

                };
            }
        case Actions.GET_PRODUIT:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.GET_UPDATE_PRODUIT:
            {
                return {
                    ...state,
                    loadingsPhone: false,
                    phone: action.payload,
                    showPhone: true

                };
            }
        case Actions.GET_PRODUITS_SIMILAIRES:
            {
                return {
                    ...state,
                    loadingPS: false,
                    produitsSimilaires: action.payload

                };
            }
        case Actions.OPEN_NEW_DEMANDE_DEVIS_DIALOG:
            {
                return {
                    ...state,
                    demandeDevisDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: action.id
                    }
                };
            }
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loadingsDevis: true,
                };
            }
        case Actions.SAVE_DEMANDE_DEVIS:
            {
                return {
                    ...state,
                    loadingsDevis: false,
                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loadingsDevis: false,


                };
            }
        case Actions.CLOSE_NEW_DEMANDE_DEVIS_DIALOG:
            {
                return {
                    ...state,
                    demandeDevisDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        default:
            {
                return state;
            }
    }
};

export default detailProduitReducer;
