import * as Actions from '../actions';

const initialState = {
    entities: null,
    searchText: '',
    loading: false,
    selectedSecteursIds: [],
    // fournisseurs: [],
    routeParams: {},
    blackListesDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },

};

const blackListesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case Actions.SAVE_DATA:
        case Actions.SAVE_ERROR:

            {
                return {
                    ...state,
                    loading: false
                };
            }
        case Actions.GET_BLACK_LISTES:
            {
                return {
                    ...state,
                    entities: action.payload
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        case Actions.OPEN_NEW_BLACK_LISTES_DIALOG:
            {
                return {
                    ...state,
                    blackListesDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_BLACK_LISTES_DIALOG:
            {
                return {
                    ...state,
                    blackListesDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_BLACK_LISTES_DIALOG:
            {
                return {
                    ...state,
                    blackListesDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }

        case Actions.CLOSE_EDIT_BLACK_LISTES_DIALOG:
            {
                return {
                    ...state,
                    blackListesDialog: {
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

export default blackListesReducer;
