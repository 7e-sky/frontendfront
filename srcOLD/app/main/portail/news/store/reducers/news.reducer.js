import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {

    data: [],
    loading: false,
    totalItems: null,
    pageCount: null,
    parametres: {
        itemsPerPage: 10,
        titre: '',
        page: 1,
        filter: {
            id: 'created-desc',
        }
    },
};

const newsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_NEWS:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.GET_NEWS:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    totalItems: action.payload['hydra:totalItems'],

                };
            }
        case Actions.SET_PARAMETRES_DATA:
            {
                return {
                    ...state,
                    parametres: {
                        itemsPerPage: action.parametres.itemsPerPage,
                        titre: action.parametres.titre,
                        page: action.parametres.page,
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

export default newsReducer;
