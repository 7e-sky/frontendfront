import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    sousSecteurs : null,
    loading : false,
    error : null,
    
};

const step3Reducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_SOUS_SECTEUR:
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
        {
            return {
                ...state,
                loading : true,
            };
        }
        
        case Actions.GET_SOUS_SECTEUR:
        {
            return {
                ...state,
                sousSecteurs   : _.keyBy(action.payload, 'id'),
                loading : false
                
            };
        }

      
        case Actions.UPDATE_FOURNISSEUR:
        {
            return {
                ...state,
                loading : false,
            };
        }
        case Actions.SAVE_ERROR:
        {
            return {
                ...state,
                loading : false,
                error  : action.payload,
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default step3Reducer;
