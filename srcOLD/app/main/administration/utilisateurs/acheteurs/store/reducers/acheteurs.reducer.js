import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    data: [],
    pageCount: null,
    loading: false,
    searchText: '',
    parametres: {
        page: 1,
        societe: '',
        search:[],
        filter: {
            id: 'created',
            direction: 'desc'
        }
    },
    
};

const acheteursReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_ACHETEURS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_ACHETEURS:
            {
                return {
                    ...state,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.SET_ACHETEURS_SEARCH_TEXT:
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

export default acheteursReducer;
