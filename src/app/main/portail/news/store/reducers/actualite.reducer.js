import * as Actions from '../actions';

const initialState = {
    data: [],
    loading: false,

};

const actualiteReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_NEW:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_NEW:
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

export default actualiteReducer;
