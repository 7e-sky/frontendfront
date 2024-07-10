import * as Actions from '../actions';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedMotifsIds: [],
    routeParams       : {},
    motifsDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },

};

const motifsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MOTIFS:
        {
            return {
                ...state,
                entities   : action.payload
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        
        case Actions.OPEN_NEW_MOTIFS_DIALOG:
        {
            return {
                ...state,
                motifsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_MOTIFS_DIALOG:
        {
            return {
                ...state,
                motifsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_MOTIFS_DIALOG:
        {
            return {
                ...state,
                motifsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_MOTIFS_DIALOG:
        {
            return {
                ...state,
                motifsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default motifsReducer;
