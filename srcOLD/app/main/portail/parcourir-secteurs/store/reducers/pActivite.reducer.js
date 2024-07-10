import * as Actions from '../actions';

const initialState = {
    data: null,
    loading: false,
    fournisseurs: null,
    loadingFournisseurs: false,
    sousSecteur: null,
    loadingSousSecteur: false,
};

const pActiviteReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_CATEGORIES:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_CATEGORIES:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.REQUEST_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    loadingSousSecteur: true,


                };
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    loadingSousSecteur: false,
                    sousSecteur: action.payload

                };
            }
        case Actions.REQUEST_FOURNISEEURS:
            {
                return {
                    ...state,
                    loadingFournisseurs: true,


                };
            }
        case Actions.GET_FOURNISEEURS:
            {
                return {
                    ...state,
                    loadingFournisseurs: false,
                    fournisseurs: action.payload

                };
            }
        default:
            {
                return state;
            }
    }
};

export default pActiviteReducer;
