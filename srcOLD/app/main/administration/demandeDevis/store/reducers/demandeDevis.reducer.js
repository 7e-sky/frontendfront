import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
};

const demandeDevisReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_DEMANDE:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.GET_DEMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.SAVE_DEMANDE:
            {
                return {
                    ...state,
                    loading: false,
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

export default demandeDevisReducer;
