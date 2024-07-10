import * as Actions from '../actions';

const initialState = {
    data: null,
    loadingC: false,
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
    loadingOffres: false,
    loadingDuree: false,
    loadingP: false,
    commandeDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },

};

const commandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_FOURNISSEUR:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,
                    success: false,
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
                    sousSecteurs: [...action.payload, { '@id': '/api/sous_secteurs/98', name: 'Autre' }],
                    loadingSS: false,

                };
            }
        // Mode paiement   
        case Actions.REQUEST_PAIEMENT:
            {
                return {
                    ...state,
                    loadingP: true,
                }
            }
        case Actions.GET_PAIEMENT:
            {
                return {
                    ...state,
                    paiements: action.payload,
                    loadingP: false,

                };
            }
        // Durée
        case Actions.REQUEST_DUREE:
            {
                return {
                    ...state,
                    loadingDuree: true,
                }
            }
        case Actions.GET_DUREE:
            {
                return {
                    ...state,
                    durees: action.payload,
                    loadingDuree: false,

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
        case Actions.REQUEST_COMMANDE:
            {
                return {
                    ...state,
                    loadingC: true,
                }
            }
        case Actions.GET_COMMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loadingC: false,

                };
            }
        case Actions.SAVE_COMMANDE:
            {
                return {
                    ...state,
                    loading: false,
                    success: true,
                    data: action.payload
                };
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    success: false,
                    data: null,
                    error: null

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
        case Actions.REQUEST_OFFRES:
            {
                return {
                    ...state,
                    loadingOffres: true,
                }
            }
        case Actions.GET_OFFRES:
            {
                return {
                    ...state,
                    offres: action.payload,
                    loadingOffres: false,

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
        case Actions.OPEN_NEW_COMMANDE_DIALOG:
            {
                return {
                    ...state,
                    commandeDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_NEW_COMMANDE_DIALOG:
            {
                return {
                    ...state,
                    commandeDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_COMMANDE_DIALOG:
            {
                return {
                    ...state,
                    commandeDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_COMMANDE_DIALOG:
            {
                return {
                    ...state,
                    commandeDialog: {
                        type: 'edit',
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

export default commandeReducer;
