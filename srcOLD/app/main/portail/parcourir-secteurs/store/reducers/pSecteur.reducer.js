import * as Actions from '../actions';

const initialState = {
    data: null,
    loading: false,
    secteur: null,
    loadingSecteur: false,
    fournisseurs: null,
    loadingFournisseurs: false,

};

const pSecteurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_ACTIVITES:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_ACTIVITES:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.REQUEST_SECTEUR:
            {
                return {
                    ...state,
                    loadingSecteur: true,


                };
            }
        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    loadingSecteur: false,
                    secteur: action.payload

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

export default pSecteurReducer;
