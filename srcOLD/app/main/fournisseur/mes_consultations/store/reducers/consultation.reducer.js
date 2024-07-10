import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    personnels: null,
    request: false
};

const demandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_CONSULTATION:
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
                    request: true,

                }
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    data: null,
                    loading: false,
                    error: null,


                };
            }

        case Actions.GET_CONSULTATION:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.GET_PERSONNELS:
            {
                return {
                    ...state,
                    personnels: action.payload,

                };
            }
        case Actions.SAVE_CONSULTANTION:
            {
                return {
                    ...state,
                    request: false,
                }
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
