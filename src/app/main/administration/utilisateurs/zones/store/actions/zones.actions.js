import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_PAYS = '[PAYS APP] GET PAYS';
export const GET_ZONES = '[ZONES APP] GET ZONES';
export const SET_SEARCH_TEXT = '[ZONES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ZONES = '[ZONES APP] TOGGLE IN SELECTED ZONES';
export const SELECT_ALL_ZONES = '[ZONES APP] SELECT ALL ZONES';
export const DESELECT_ALL_ZONES = '[ZONES APP] DESELECT ALL ZONES';
export const OPEN_NEW_ZONES_DIALOG = '[ZONES APP] OPEN NEW ZONES DIALOG';
export const CLOSE_NEW_ZONES_DIALOG = '[ZONES APP] CLOSE NEW ZONES DIALOG';
export const OPEN_EDIT_ZONES_DIALOG = '[ZONES APP] OPEN EDIT ZONES DIALOG';
export const CLOSE_EDIT_ZONES_DIALOG = '[ZONES APP] CLOSE EDIT ZONES DIALOG';
export const ADD_ZONE = '[ZONES APP] ADD ZONE';
export const SAVE_ERROR = '[ZONES APP] SAVE ERROR';
export const UPDATE_ZONE = '[ZONES APP] UPDATE ZONE';
export const REMOVE_ZONE = '[ZONES APP] REMOVE ZONE';
export const STATUT_ZONE = '[ZONES APP] STATUT ZONE';
export const UPLOAD_IMAGE = '[ZONES APP] UPLOAD IMAGE';
export const UPLOAD_REQUEST = '[ZONES APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[ZONES APP] UPLOAD ERROR';
export const REQUEST_SAVE = '[ZONES APP] REQUEST SAVE';
export const REQUEST_ZONE = '[ZONES APP] REQUEST_ZONE';

export function getPays() {
    const request = agent.get('/api/pays?pagination=false&props[]=id&props[]=name');

    return (dispatch) =>
        request.then((response) => {

            dispatch({
                type: GET_PAYS,
                payload: response.data['hydra:member']
            })
        });
}


export function getZones() {
    const request = agent.get('/api/zone_commercials');

    return (dispatch) => {
        dispatch({
            type: REQUEST_ZONE,
        })
        return request.then((response) => {
            dispatch({
                type: GET_ZONES,
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


export function openNewZonesDialog() {
    return {
        type: OPEN_NEW_ZONES_DIALOG
    }
}

export function closeNewZonesDialog() {
    return {
        type: CLOSE_NEW_ZONES_DIALOG
    }
}

export function openEditZonesDialog(data) {
    return {
        type: OPEN_EDIT_ZONES_DIALOG,
        data
    }
}

export function closeEditZonesDialog() {
    return {
        type: CLOSE_EDIT_ZONES_DIALOG
    }
}

export function addZone(newZone) {
    let arr = null;
    let avatar = null;
    if (newZone.pays) {
        arr = newZone.pays.map((item => { return item.value }));
    }
    if (newZone.avatar && newZone.avatar.url) {
        avatar = newZone.avatar['@id'];
    }

    const data = {
        ...newZone,
        pays: arr,
        avatar: avatar
    }
    // newZone.pays = newZone.pays.map((item => { return item.value }));

    // if (newZone.avatar && newZone.avatar.url)
    //    newZone.avatar = newZone.avatar['@id'];


    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        const request = agent.post('/api/zone_commercials', data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_ZONE
                }),
                dispatch(showMessage({
                    message: 'Admin commercials bien ajouté!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                dispatch(closeNewZonesDialog())
            ]).then(() => dispatch(getZones()))
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };
}

export function updateZone(Zone) {

    let arr = null;
    let avatar = null;
    if (Zone.pays) {
        arr = Zone.pays.map((item => { return item.value }));
    }
    if (Zone.avatar && Zone.avatar.url) {
        avatar = Zone.avatar['@id'];
    }

    const data = {
        ...Zone,
        pays: arr,
        avatar: avatar
    }

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });

        const request = agent.put(Zone['@id'], data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_ZONE
                }),
                dispatch(showMessage({
                    message: 'Admin commercials bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                dispatch(closeEditZonesDialog())
            ]).then(() => dispatch(getZones()))
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };
}

export function removeZone(Zone) {

    let UpdateZone = { del: true, username: Zone.username + '_deleted-' + Zone.id, email: Zone.email + '_deleted-' + Zone.id }

    return (dispatch, getState) => {


        const request = agent.put(Zone['@id'], UpdateZone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ZONE
                }),
                dispatch(showMessage({
                    message: 'Admin commercials bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getZones()))
        );
    };
}

export function activeAccount(Zone, active) {

    let UpdateZone = { isactif: active }
    return (dispatch, getState) => {


        const request = agent.put(Zone['@id'], UpdateZone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: STATUT_ZONE
                }),
                dispatch(showMessage({
                    message: 'Statut modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getZones()))
        );
    };
}

export function uploadImage(file) {

    return (dispatch, getState) => {

        const formData = new FormData();
        formData.append("file", file);

        const request = agent.post('/api/avatars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_REQUEST
        });
        return request.then((response) =>

            Promise.all([
                (response),
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: response.data

                }),
                dispatch(showMessage({
                    message: 'Image uploaded!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).catch((error) => {
            dispatch({
                type: UPLOAD_ERROR,
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
        }

        );
    };
}


