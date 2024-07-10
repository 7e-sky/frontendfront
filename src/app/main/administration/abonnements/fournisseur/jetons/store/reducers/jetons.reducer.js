import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities: null,
    paiements: null,
    parametres: {
        page: 1,
        search: [],
        filter: {
            id: 'created',
            direction: 'desc'
        }
    },
    pageCount: null,
    loading: false,
    searchText: '',
    selectedJetonsIds: [],
    routeParams: {},
    jetonsDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },

};

const jetonsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_PARAMETRES_DATA:
            {
                return {
                    ...state,
                    parametres: {
                        page: action.parametres.page,
                        search: action.parametres.search,
                        filter: {
                            id: action.parametres.filter.id,
                            direction: action.parametres.filter.direction
                        }
                    }

                };
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState

                };
            }
        case Actions.REQUEST_JETONS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_JETONS:
            {
                return {
                    ...state,
                    entities: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.GET_PAIEMENT:
            {
                return {
                    ...state,
                    paiements: action.payload
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        case Actions.OPEN_NEW_JETONS_DIALOG:
            {
                return {
                    ...state,
                    jetonsDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_JETONS_DIALOG:
            {
                return {
                    ...state,
                    jetonsDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_JETONS_DIALOG:
            {
                return {
                    ...state,
                    jetonsDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_JETONS_DIALOG:
            {
                return {
                    ...state,
                    jetonsDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        default:
            {
                return state;
            }
    }
};

export default jetonsReducer;
