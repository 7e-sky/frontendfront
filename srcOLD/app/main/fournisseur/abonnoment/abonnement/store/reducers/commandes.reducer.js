import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    data: [],
    pageCount: null,
    loading: false,
    searchText: '',
    parametres: {
        page: 1,
        reference: '',
        filter: {
            id: 'created',
            direction: 'desc'
        }
    },
};

const commandesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_COMMANDES:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case Actions.GET_COMMANDES:
            {
                return {
                    ...state,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.SET_COMMANDES_SEARCH_TEXT:
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
                        reference: action.parametres.reference,
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

export default commandesReducer;
