import * as Actions from '../actions';

const initialState = {
    data: null,
    offres: null,
    fournisseur: null,
    loadingSecteurs: false,
    secteurs: null,
    sousSecteurs: null,
    error: null,
    loading: false,
    loadingSuggestion: false,
    loadingSS: false,
    success: false,
    successActivite: false,
    paiements: null,
    durees: null,
};

const commandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_COMMANDE:
        case Actions.REQUEST_FOURNISSEUR:
        case Actions.REQUEST_OFFRES:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        //Secteurs    
        case Actions.REQUEST_SECTEURS:
            {
                return {
                    ...state,
                    loadingSecteurs: true,
                }
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    secteurs: action.payload,
                    loadingSecteurs: false,

                };
            }
        //Activités    
        case Actions.REQUEST_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    loadingSS: true,
                }
            }
        case Actions.GET_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload,
                    loadingSS: false,

                };
            }
        // Mode paiement   
        case Actions.GET_PAIEMENT:
            {
                return {
                    ...state,
                    paiements: action.payload
                };
            }
        // Durée
        case Actions.GET_DUREE:
            {
                return {
                    ...state,
                    durees: action.payload
                };
            }
        // Suggestions  
        case Actions.REQUEST_SUGGESTION:
            {
                return {
                    ...state,
                    loadingSuggestion: true,
                }
            }
        case Actions.SAVE_SUGGESTION:
            {
                return {
                    ...state,
                    successActivite: true,
                    loadingSuggestion: false,
                };
            }
        // Commande    
        case Actions.GET_COMMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.SAVE_COMMANDE:
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
                    initialState,

                };
            }
        // Fournisseur
        case Actions.GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    fournisseur: action.payload,
                    loading: false,

                };
            }
        // Offres    
        case Actions.GET_OFFRES:
            {
                return {
                    ...state,
                    offres: action.payload,
                    loading: false,

                };
            }
        // Erreurs    
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

export default commandeReducer;
