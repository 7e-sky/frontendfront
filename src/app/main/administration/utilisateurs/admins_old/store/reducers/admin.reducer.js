import * as Actions from '../actions';

const initialState = {
    data: null,
    error :null
};

const adminReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMIN:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_ADMIN:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_ERROR:
        {
            return {
                ...state,
                error  : action.payload,
                
            };
        }
        default:
        {
            return state;
        }
    }
};

export default adminReducer;
