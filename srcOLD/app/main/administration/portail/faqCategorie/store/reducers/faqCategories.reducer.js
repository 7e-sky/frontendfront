import * as Actions from '../actions';

const initialState = {
    entities          : null,
    parametres:{
        page : 1,
        name :'',
        filter: {
            id : 'id',
            direction : 'asc'
        }
    },
    pageCount : null,
    loading : false,
    searchText        : '',
    routeParams       : {},
    faqCategoriesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    pays : null
};

const faqCategoriesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_FAQ_CATEGORIES:
        {
            return {
                ...state,
                loading : true
                
            };
        }
      
        case Actions.GET_FAQ_CATEGORIES:
        {
            return {
                ...state,
                entities   :action.payload['hydra:member'],
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
        
        case Actions.OPEN_NEW_FAQ_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                faqCategoriesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_FAQ_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                faqCategoriesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_FAQ_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                faqCategoriesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_FAQ_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                faqCategoriesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
       
        default:
        {
            return state;
        }
    }
};

export default faqCategoriesReducer;
