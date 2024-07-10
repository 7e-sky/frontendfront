import * as Actions from '../actions';

const initialState = {
    entities: null,
    searchText: '',
    selectedCommandesIds: [],
    routeParams: {},
    commandesDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },

};

const commandesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_COMMANDES:
            {
                return {
                    ...state,
                    entities: action.payload
                };
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState

                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        case Actions.OPEN_NEW_COMMANDES_DIALOG:
            {
                return {
                    ...state,
                    commandesDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_COMMANDES_DIALOG:
            {
                return {
                    ...state,
                    commandesDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_COMMANDES_DIALOG:
            {
                return {
                    ...state,
                    commandesDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_COMMANDES_DIALOG:
            {
                return {
                    ...state,
                    commandesDialog: {
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

export default commandesReducer;
