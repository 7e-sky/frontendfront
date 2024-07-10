import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
};

const contactFournisseurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }
        case Actions.CLEAN_ERROR:
            {
                return {
                    ...state,
                    error: null,
                };
            }
        case Actions.REQUEST_CONTACT:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.GET_CONTACT:
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
                    loading: false,

                };
            }
        default:
            {
                return state;
            }
    }
};

export default contactFournisseurReducer;
