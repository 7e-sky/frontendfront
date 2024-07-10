import {combineReducers} from 'redux';
import pSecteurs from './pSecteurs.reducer';
import pSecteur from './pSecteur.reducer';
import pActivite from './pActivite.reducer';

const reducer = combineReducers({
    pSecteurs,
    pSecteur,
    pActivite,
});

export default reducer;
