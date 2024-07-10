import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    error: null,
    loadingZone: false,
    loading: false,
    searchText: '',
    selectedZonesIds: [],
    routeParams: {},
    zonesDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    avatar: null,
    pays: null,
    imageReqInProgress: false
};

const zonesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_ZONE:
            {
                return {
                    ...state,
                    loadingZone: true,

                }
            }
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.ADD_ZONE:
            {
                return {
                    ...state,
                    loading: false,
                    error: null,
                };
            }
        case Actions.GET_PAYS:
            {
                return {
                    ...state,
                    executed: false,
                    message: null,
                    pays: _.keyBy(action.payload, 'id')
                };
            }
        case Actions.GET_ZONES:
            {
                return {
                    ...state,
                    entities: action.payload,
                    loadingZone: false,
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        case Actions.OPEN_NEW_ZONES_DIALOG:
            {
                return {
                    ...state,
                    zonesDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_ZONES_DIALOG:
            {
                return {
                    ...state,
                    zonesDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_ZONES_DIALOG:
            {
                return {
                    ...state,
                    zonesDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_ZONES_DIALOG:
            {
                return {
                    ...state,
                    zonesDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }

        case Actions.UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    imageReqInProgress: true

                };
            }
        case Actions.UPLOAD_IMAGE:
            {
                return {
                    ...state,
                    avatar: action.payload,
                    imageReqInProgress: false

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    imageReqInProgress: false

                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,

                };
            }
        default:
            {
                return state;
            }
    }
};

export default zonesReducer;
