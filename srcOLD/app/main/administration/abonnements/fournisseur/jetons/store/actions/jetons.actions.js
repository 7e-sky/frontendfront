import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_JETONS = '[JETONS APP] GET JETONS';
export const SET_SEARCH_TEXT = '[JETONS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_JETONS = '[JETONS APP] TOGGLE IN SELECTED JETONS';
export const SELECT_ALL_JETONS = '[JETONS APP] SELECT ALL JETONS';
export const DESELECT_ALL_JETONS = '[JETONS APP] DESELECT ALL JETONS';
export const OPEN_NEW_JETONS_DIALOG = '[JETONS APP] OPEN NEW JETONS DIALOG';
export const CLOSE_NEW_JETONS_DIALOG = '[JETONS APP] CLOSE NEW JETONS DIALOG';
export const OPEN_EDIT_JETONS_DIALOG = '[JETONS APP] OPEN EDIT JETONS DIALOG';
export const CLOSE_EDIT_JETONS_DIALOG = '[JETONS APP] CLOSE EDIT JETONS DIALOG';
export const ADD_JETON = '[JETONS APP] ADD JETON';
export const SAVE_ERROR = '[JETONS APP] SAVE ERROR';
export const UPDATE_JETON = '[JETONS APP] UPDATE JETON';
export const REQUEST_JETONS = '[JETONS APP] REQUEST_JETONS';
export const REMOVE_JETON = '[JETONS APP] REMOVE JETON';
export const SET_PARAMETRES_DATA = '[JETONS APP] SET PARAMETRES DATA';
export const CLEAN_UP = '[JETONS APP] CLEAN_UP';
export const GET_PAIEMENT = '[JETONS APP] GET_PAIEMENT';

export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}
export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}
export function getJetons(parametres) {
    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map((item) => (
            item.value && (
                item.id === 'created' ? (search += '&' + item.id + '[after]=' + item.value) : (search += '&' + item.id + '=' + item.value))
        ));
    }
    const request = agent.get(`/api/jetons?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_JETONS,
        });
        return request.then((response) => {
            dispatch({
                type: GET_JETONS,
                payload: response.data
            })
        });
    }

}

export function getPaiements() {
    const request = agent.get(`/api/paiements`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_PAIEMENT,
                payload: response.data['hydra:member']
            })
        });
    }

}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openNewJetonsDialog() {
    return {
        type: OPEN_NEW_JETONS_DIALOG
    }
}

export function closeNewJetonsDialog() {
    return {
        type: CLOSE_NEW_JETONS_DIALOG
    }
}

export function openEditJetonsDialog(data) {
    return {
        type: OPEN_EDIT_JETONS_DIALOG,
        data
    }
}

export function closeEditJetonsDialog() {
    return {
        type: CLOSE_EDIT_JETONS_DIALOG
    }
}

export function UpdateJeton(newJeton,parametres) {

    let UpdatedJetons = {
        'paiement': newJeton.paiement.value,
        'prix': parseFloat(newJeton.prix),
        'isPayed': newJeton.isPayed
    }

    return (dispatch, getState) => {


        const request = agent.put(newJeton["@id"], UpdatedJetons);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_JETON
                }),
                dispatch(showMessage({
                    message: 'Jetons bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getJetons(parametres)))
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return key + ': ' + value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}
export function addJeton(jetons,parametres) {

    let newJetons = {
        'fournisseur': jetons.fournisseur,
        'paiement': jetons.paiement.value,
        'nbrJeton': jetons.nbrJeton,
        'prix': parseFloat(jetons.prix),
        'isPayed': jetons.isPayed
    }

    return (dispatch, getState) => {


        const request = agent.post('/api/jetons', newJetons);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_JETON
                }),
                dispatch(showMessage({
                    message: 'Jetons bien effuctué!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getJetons(parametres)))
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return key + ': ' + value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}



export function removeJeton(Jeton, id) {

    return (dispatch, getState) => {


        const request = agent.put(Jeton['@id'],{del:true});

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_JETON
                }),
                dispatch(showMessage({
                    message: 'Jeton bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getJetons(id)))
        );
    };
}



