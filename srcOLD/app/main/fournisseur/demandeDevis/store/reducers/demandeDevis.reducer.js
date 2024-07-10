import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
};

const demandeDevisReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_DEMANDE:
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
      
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                };
            }
        default:
            {
                return state;
            }
    }
};

export default demandeDevisReducer;
