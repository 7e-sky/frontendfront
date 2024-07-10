import * as Actions from '../actions';
import _ from '@lodash';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities          : null,
    parametres:{
        page : 1,
        search:[],
        filter: {
            id : 'id',
            direction : 'asc'
        }
    },
    pageCount : null,
    loading : false,
    searchText        : '',
    selectedVillesIds: [],
    routeParams       : {},
    villesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    pays : null
};

const villesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_VILLES:
        {
            return {
                ...state,
                loading : true
                
            };
        }
        case Actions.GET_PAYS:
        {
            return {
                ...state,
                pays   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_VILLES:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload['hydra:member'], 'id'),
                pageCount: FuseUtils.hydraPageCount(action.payload),
                loading : false
            };
        }
        case Actions.SAVE_ERROR:
        {
            return {
                ...state,
                loading : false
            };
        }
        
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        
        case Actions.OPEN_NEW_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.SET_PARAMETRES_DATA:
        {
            return {
                ...state,
                parametres:{
                    page : action.parametres.page,
                    search :action.parametres.search,
                    filter: {
                        id : action.parametres.filter.id,
                        direction : action.parametres.filter.direction
                    }
                }
                
            };
        }
        default:
        {
            return state;
        }
    }
};

export default villesReducer;
