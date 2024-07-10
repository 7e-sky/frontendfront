import * as Actions from '../actions';

const initialState = {
    data: [],
    loading: false,

};

const demandeReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    loading: false
                }
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_DEMANDE:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_DEMANDE:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        default:
            {
                return state;
            }
    }
};

export default demandeReducer;
