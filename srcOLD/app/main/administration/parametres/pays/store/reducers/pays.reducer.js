import * as Actions from '../actions';
import _ from '@lodash';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities          : null,
    parametres:{
        page : 1,
        name :'',
        search:[],
        filter: {
            id : 'id',
            direction : 'asc'
        }
    },
    pageCount : null,
    loading : false,
    searchText        : '',
    selectedPaysIds: [],
    routeParams       : {},
    paysDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const paysReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_PAYS:
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
        case Actions.TOGGLE_IN_SELECTED_PAYS:
        {

            const PaysId = action.PaysId;

            let selectedPaysIds = [...state.selectedPaysIds];

            if ( selectedPaysIds.find(id => id === PaysId) !== undefined )
            {
                selectedPaysIds = selectedPaysIds.filter(id => id !== PaysId);
            }
            else
            {
                selectedPaysIds = [...selectedPaysIds, PaysId];
            }

            return {
                ...state,
                selectedPaysIds: selectedPaysIds
            };
        }
        case Actions.SELECT_ALL_PAYS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedPaysIds = arr.map(pays => pays.id);

            return {
                ...state,
                selectedPaysIds: selectedPaysIds
            };
        }
        case Actions.DESELECT_ALL_PAYS:
        {
            return {
                ...state,
                selectedPaysIds: []
            };
        }
        case Actions.OPEN_NEW_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
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
                    name :action.parametres.name,                   
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

export default paysReducer;
