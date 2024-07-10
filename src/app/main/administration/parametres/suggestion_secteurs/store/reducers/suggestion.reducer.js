import * as Actions from '../actions';

const initialState = {

    requestSuggestion: false,
    requestSecteur: false,
    requestSousSecteur: false,
    requestCategorie: false,
    error: null,
    data: null,
    secteur: null,
    sousSecteur: null,
    categorie: null,

};

const suggestionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    requestSuggestion: false,
                    error: null,
                    data: null,
                    secteur: null,
                    sousSecteur: null,
                };
            }

        case Actions.REQUEST_SAVE_SUGGESTION:
            {
                return {
                    ...state,
                    requestSuggestion: true,
                };
            }
        case Actions.REQUEST_SUGGESTIONS:
            {
                return {
                    ...state,
                    requestSuggestion: true,
                };
            }
        case Actions.REQUEST_SECTEUR:
            {
                return {
                    ...state,
                    requestSecteur: true,
                };
            }
        case Actions.REQUEST_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    requestSousSecteur: true,
                };
            }
        case Actions.REQUEST_CATEGORIE:
            {
                return {
                    ...state,
                    requestCategorie: true,
                };
            }
        case Actions.GET_SUGGESTION:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestSuggestion: false,
                    error: null
                };
            }
        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    secteur: action.payload,
                    requestSecteur: false,
                };
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteur: action.payload,
                    requestSousSecteur: false,
                };
            }
        case Actions.GET_CATEGORIE:
            {
                return {
                    ...state,
                    categorie: action.payload,
                    requestCategorie: false,
                };
            }
        case Actions.SAVE_SUGGESTION:
            {
                return {
                    ...state,
                    requestSuggestion: false,
                    error: null

                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    requestSuggestion: false,
                    error: action.payload,
                };
            }
        default:
            {
                return state;
            }
    }
};

export default suggestionReducer;
