import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const REQUEST_FOURNISSEUR = '[PROFILE APP] REQUEST FOURNISSEUR';
export const GET_FOURNISSEUR = '[PROFILE APP] GET FOURNISSEUR';
export const GET_PAYS = '[PROFILE APP] GET PAYS';
export const GET_VILLES = '[PROFILE APP] GET VILLES';
export const REQUEST_PAYS = '[PROFILE APP] REQUEST PAYS';
export const REQUEST_VILLES = '[PROFILE APP] REQUEST VILLES';
export const SAVE_ERROR = '[PROFILE APP] SAVE ERROR';
export const UPDATE_FOURNISSEUR = '[PROFILE APP] UPDATE FOURNISSEUR';
export const REQUEST_UPDATE_FOURNISSEUR = '[PROFILE APP] REQUEST UPDATE_FOURNISSEUR';

export const REQUEST_SOUS_SECTEUR = '[PROFILE APP] REQUEST_SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[PROFILE APP] GET_SOUS_SECTEUR';

export const UPLOAD_AVATAR = '[PROFILE APP] UPLOAD AVATAR';
export const UPLOAD_REQUEST = '[PROFILE APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[PROFILE APP] UPLOAD ERROR';

export function getProfile(id_fournisseur) {
    const request = agent.get(`/api/fournisseurs/${id_fournisseur}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR,
        });
        return request.then((response) => {

            dispatch({
                type: GET_FOURNISSEUR,
                payload: response.data
            })
        });

    }

}
export function getPays() {
    const request = agent.get('/api/pays?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_PAYS,
        });
        return request.then((response) => {

            dispatch({
                type: GET_PAYS,
                payload: response.data['hydra:member']
            })
        });

    }


}

export function getVilles(pays_id) {
    const request = agent.get(`${pays_id}/villes?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VILLES,
        });
        return request.then((response) => {

            dispatch({
                type: GET_VILLES,
                payload: response.data['hydra:member']
            })
        });

    }

}


export function getSousSecteurs(url) {
    const request = agent.get(`/api/sous_secteurs?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data["hydra:member"]
            })
        });

    }

}



export function updateSocieteInfo(data, id_fournisseur) {


    if (data.pays.label !== 'Maroc') {
        data.ice = null;
    }
    data.pays = data.pays.value;
    data.ville = data.ville.value;

    if (data.codepostal === null) {
        delete data.codepostal;
    } else {
        data.codepostal = parseInt(data.codepostal);
    }



    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).then(() => dispatch(getProfile(id_fournisseur)))
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}

export function updateSocieteSousSecteurs(categories, produitsSuggestion, id_fournisseur) {

    var putData = {
        categories: _.map(categories, function (value, key) {
            return value['@id'];
        }),
        autreCategories: produitsSuggestion.length > 0 ? _.join(produitsSuggestion, ', ') : null

    }

    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, putData);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).then(() => dispatch(getProfile(id_fournisseur)))
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}

export function updateUserInfo(data, id_fournisseur) {



    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).then(() => dispatch(getProfile(id_fournisseur)))
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}

export function updatePassword(data, id_fournisseur) {



    return (dispatch, getState) => {

        const request = agent.put(`/api/users/${id_fournisseur}/reset-password`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) => {

            if (response.data.user) {
                this.setSession(response.data.token);
            }
            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),

                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        }
        ).then(() => dispatch(getProfile(id_fournisseur)))
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}
export function setSession(access_token) {
    if (access_token) {
        localStorage.setItem('jwt_access_token', access_token);
        agent.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

    }
    else {
        localStorage.removeItem('jwt_access_token');
        delete agent.defaults.headers.common['Authorization'];
    }
};


export function uploadAvatar(file, id_fournisseur) {

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
                    type: UPLOAD_AVATAR,
                    payload: response.data

                }),
                dispatch(updateUserAvatar({ avatar: response.data['@id'] }, id_fournisseur))
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

export function updateUserAvatar(data, id_fournisseur) {



    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };

}

