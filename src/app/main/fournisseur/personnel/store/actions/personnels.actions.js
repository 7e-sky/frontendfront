import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_PERSONNELS = '[PERSONNELS APP] GET PERSONNELS';
export const SET_SEARCH_TEXT = '[PERSONNELS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PERSONNELS = '[PERSONNELS APP] TOGGLE IN SELECTED PERSONNELS';
export const SELECT_ALL_PERSONNELS = '[PERSONNELS APP] SELECT ALL PERSONNELS';
export const DESELECT_ALL_PERSONNELS = '[PERSONNELS APP] DESELECT ALL PERSONNELS';
export const OPEN_NEW_PERSONNELS_DIALOG = '[PERSONNELS APP] OPEN NEW PERSONNELS DIALOG';
export const CLOSE_NEW_PERSONNELS_DIALOG = '[PERSONNELS APP] CLOSE NEW PERSONNELS DIALOG';
export const OPEN_EDIT_PERSONNELS_DIALOG = '[PERSONNELS APP] OPEN EDIT PERSONNELS DIALOG';
export const CLOSE_EDIT_PERSONNELS_DIALOG = '[PERSONNELS APP] CLOSE EDIT PERSONNELS DIALOG';
export const ADD_PERSONNEL = '[PERSONNELS APP] ADD PERSONNEL';
export const SAVE_ERROR = '[PERSONNELS APP] SAVE ERROR';
export const UPDATE_PERSONNEL = '[PERSONNELS APP] UPDATE PERSONNEL';
export const REMOVE_PERSONNEL = '[PERSONNELS APP] REMOVE PERSONNEL';
export const UPLOAD_IMAGE = '[PERSONNELS APP] UPLOAD IMAGE';
export const UPLOAD_REQUEST = '[PERSONNELS APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[PERSONNELS APP] UPLOAD ERROR';

export function getPersonnels(id) {
    const request = agent.get(`/api/fournisseurs/${id}/personnels`);

    return (dispatch) =>
        request.then((response) => {

            dispatch({
                type: GET_PERSONNELS,
                payload: response.data['hydra:member']
            })
        });
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedPersonnels(PersonnelsId) {
    return {
        type: TOGGLE_IN_SELECTED_PERSONNELS,
        PersonnelsId
    }
}



export function openNewPersonnelsDialog() {
    return {
        type: OPEN_NEW_PERSONNELS_DIALOG
    }
}

export function closeNewPersonnelsDialog() {
    return {
        type: CLOSE_NEW_PERSONNELS_DIALOG
    }
}

export function openEditPersonnelsDialog(data) {
    return {
        type: OPEN_EDIT_PERSONNELS_DIALOG,
        data
    }
}

export function closeEditPersonnelsDialog() {
    return {
        type: CLOSE_EDIT_PERSONNELS_DIALOG
    }
}

export function addPersonnel(newPersonnel, id) {

    const data = {
        ...newPersonnel,
        avatar: newPersonnel.avatar ? newPersonnel.avatar['@id'] : null
    }

    return (dispatch, getState) => {


        const request = agent.post('/api/personnels', data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_PERSONNEL
                }),
                dispatch(showMessage({
                    message: 'Agence / Service bien ajouté!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getPersonnels(id)))
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

export function updatePersonnel(personnel, id) {

    const data = {
        ...personnel,
        avatar: personnel.avatar ? personnel.avatar['@id'] : null
    }
    return (dispatch, getState) => {


        const request = agent.put(personnel['@id'], data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PERSONNEL
                }),
                dispatch(showMessage({
                    message: 'Agence / Service bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getPersonnels(id)))
        )
            .catch((error) => {
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

export function removePersonnel(personnel, id) {
    let UpdatePersonnel = { del: true }

    return (dispatch, getState) => {

        const request = agent.put(personnel['@id'], UpdatePersonnel);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PERSONNEL
                }),
                dispatch(showMessage({
                    message: 'Agence / Service bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getPersonnels(id)))
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
                    message: 'Image téléchargée!', anchorOrigin: {
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


