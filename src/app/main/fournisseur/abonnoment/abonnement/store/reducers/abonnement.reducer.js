import * as Actions from '../actions';

const initialState = {
    data: null,
    offres: null,
    sousSecteurs: null,
    error: null,
    loading: false,
    loadingSS: false,
    success: false,
    paiements: null,
    durees: null,
    loadingFournisseurs: false,
    fournisseurs: null,
    fournisseur: null,
};

const abonnementReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_ABONNEMENT:
        case Actions.REQUEST_OFFRES:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,
                    loadingSS: true,
                }
            }
        case Actions.REQUEST_FOURNISSEURS:
        case Actions.REQUEST_FOURNISSEUR:
            {
                return {
                    ...state,
                    loadingFournisseurs: true,
                }
            }
        case Actions.GET_FOURNISSEURS:
            {
                return {
                    ...state,
                    fournisseurs: action.payload,
                    loadingFournisseurs: false,
                };
            }
        case Actions.GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    fournisseur: action.payload,
                    loadingFournisseurs: false,
                };
            }
        case Actions.GET_PAIEMENT:
            {
                return {
                    ...state,
                    paiements: action.payload
                };
            }
        case Actions.GET_DUREE:
            {
                return {
                    ...state,
                    durees: action.payload
                };
            }
        case Actions.SAVE_ABONNEMENT:
            {
                return {
                    ...state,
                    loading: false,
                    success: true
                };
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,

                };
            }
        case Actions.CLEAN_UP_FRS:
            {
                return {
                    ...state,
                    fournisseur: null,


                };
            }
        case Actions.GET_ABONNEMENT:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.GET_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload,
                    loadingSS: false,

                };
            }
        case Actions.GET_OFFRES:
            {
                return {
                    ...state,
                    offres: action.payload,
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

export default abonnementReducer;
