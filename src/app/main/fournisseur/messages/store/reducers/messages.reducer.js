import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    data: [],
    pageCount: null,
    loading: false,
    searchText: '',
    
};

const messagesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_MESSAGES:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_MESSAGES:
            {
                return {
                    ...state,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.SET_MESSAGES_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        default:
            {
                return state;
            }
    }
};

export default messagesReducer;
