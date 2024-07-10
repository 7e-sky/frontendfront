import * as Actions from '../actions';

const initialState = {
    loadingSS: false,
    requestSecteur: false,
    error: null,
    data: null,
    secteurReqInProgress: false,
    image: null,
};

const secteurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    loadingS: false,
                    requestSecteur: false,
                    error: null,
                    data: null,
                    secteurReqInProgress: false,
                    image: null,
                };
            }
        case Actions.REMOVE_SECTEUR:
            {
                return {
                    ...state,
                    loadingS: false
                }
            }
        case Actions.REQUEST_SAVE_SECTEUR:
            {
                return {
                    ...state,
                    loadingS: true,
                };
            }
        case Actions.REQUEST_SECTEURS:
            {
                return {
                    ...state,
                    loadingS: true,
                };
            }

        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestSecteur: false,
                    error: null


                };
            }
        case Actions.SAVE_SECTEUR:
            {
                return {
                    ...state,
                    loadingS: false,
                    error: null

                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    loadingS: false,
                    error: action.payload,
                };
            }
        case Actions.UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    secteurReqInProgress: true

                };
            }

        case Actions.UPLOAD_ATTACHEMENT:
            {
                return {
                    ...state,
                    image: action.payload,
                    secteurReqInProgress: false

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    secteurReqInProgress: false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default secteurReducer;
