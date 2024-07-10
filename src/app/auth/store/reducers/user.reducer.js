import * as Actions from '../actions';

const initialState = {
    role: [],//guest
    data: {
        'displayName': 'Votre compte',
        'photoURL': null,
        'email': 'johndoe@test.com',
        shortcuts: [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    },
    jetons: 0,
    requestJeton: false,
    loadingAbonnement: false,
    abonnement: null
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA:
            {
                return {
                    ...initialState,
                    ...action.payload
                };
            }
        case Actions.REQUEST_FOURNISSEUR_JETONS:
            {
                return {
                    ...state,
                    requestJeton: true
                };
            }
        case Actions.GET_FOURNISSEUR_JETONS:
            {
                return {
                    ...state,
                    jetons: action.payload,
                    requestJeton: false
                };
            }
        case Actions.REQUEST_FOURNISSEUR_ABONNEMENT:
            {
                return {
                    ...state,
                    loadingAbonnement: true
                };
            }
        case Actions.GET_FOURNISSEUR_ABONNEMENT:
            {
                return {
                    ...state,
                    abonnement: action.payload,
                    loadingAbonnement: false
                };
            }
        case Actions.REMOVE_USER_DATA:
            {
                return {
                    ...initialState
                };
            }
        case Actions.USER_LOGGED_OUT:
            {
                return initialState;
            }
        default:
            {
                return state
            }
    }
};

export default user;
