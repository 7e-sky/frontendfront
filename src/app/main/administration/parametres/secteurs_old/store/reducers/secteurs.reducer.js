import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedSecteursIds: [],
    routeParams       : {},
    secteursDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },

};

const secteursReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SECTEURS:
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
        
        case Actions.OPEN_NEW_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
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

export default secteursReducer;
