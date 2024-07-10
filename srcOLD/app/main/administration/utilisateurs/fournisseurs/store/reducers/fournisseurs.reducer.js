import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    data: [],
    pageCount: null,
    loading: false,
    searchText: '',
    parametres: {
        page: 1,
        search:[],
        societe: '',
        filter: {
            id: 'created',
            direction: 'desc'
        }
    },
    
};

const fournisseursReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_FOURNISSEURS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_FOURNISSEURS:
            {
                return {
                    ...state,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.SET_FOURNISSEURS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.SET_PARAMETRES_DATA:
            {
                return {
                    ...state,
                    parametres: {
                        page: action.parametres.page,
                        societe: action.parametres.societe,
                        search:action.parametres.search,
                        filter: {
                            id: action.parametres.filter.id,
                            direction: action.parametres.filter.direction
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

export default fournisseursReducer;
