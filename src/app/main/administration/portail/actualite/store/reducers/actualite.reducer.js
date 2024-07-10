import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
    imageReqInProgress: false,
    deleteReqInProgress: false,
    image: null,
    image_deleted: null,
};

const actualiteReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_ACTUALITE:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    imageReqInProgress: true

                };
            }
        case Actions.REQUEST_DELETE:
            {
                return {
                    ...state,
                    deleteReqInProgress: true

                };
            }
        case Actions.UPLOAD_ATTACHEMENT:
            {
                return {
                    ...state,
                    image: action.payload,
                    imageReqInProgress: false

                };
            }
        case Actions.DELETE_SUCCESS:
            {
                return {
                    ...state,
                    deleteReqInProgress: false,
                    image_deleted: action.id,

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    imageReqInProgress: false

                };
            }
       
        case Actions.GET_ACTUALITE:
            {
                return {
                    ...state,
                    data: action.payload[0]?action.payload[0] : action.payload,
                    loading: false,

                };
            }
        case Actions.SAVE_ACTUALITE:
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

export default actualiteReducer;
