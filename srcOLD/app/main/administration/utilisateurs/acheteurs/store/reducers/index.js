import {combineReducers} from 'redux';
import acheteurs from './acheteurs.reducer';
import acheteur from './acheteur.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    acheteurs,
    dialog,
    acheteur
});

export default reducer;
