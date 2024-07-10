import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedAdminsIds: [],
    routeParams       : {},
    adminsDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    avatar :null,
    imageReqInProgress:false
};

const adminsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMINS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        
        case Actions.OPEN_NEW_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        
        case Actions.UPLOAD_REQUEST:
        {
            return {
                ...state,
                imageReqInProgress:true

            };
        }
        case Actions.UPLOAD_IMAGE:
        {
            return {
                ...state,
                avatar: action.payload,
                imageReqInProgress:false

            };
        }
        case Actions.UPLOAD_ERROR:
        {
            return {
                ...state,
                imageReqInProgress:false

            };
        }
        default:
        {
            return state;
        }
    }
};

export default adminsReducer;
