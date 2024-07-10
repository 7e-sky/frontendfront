
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import agent from 'agent';
import _ from '@lodash';

export const REQUEST_ACTUALITE = '[ACTUALITE APP] REQUEST ACTUALITE';
export const GET_ACTUALITE = '[ACTUALITE APP] GET ACTUALITE';

export const REQUEST_SAVE = '[ACTUALITE APP] REQUEST SAVE';
export const REDIRECT_SUCCESS = '[ACTUALITE APP] REDIRECT SUCCESS';

export const SAVE_ACTUALITE = '[ACTUALITE APP] SAVE ACTUALITE';
export const SAVE_ERROR = '[ACTUALITE APP] SAVE ERROR';

export const REQUEST_SOUS_SECTEUR = '[ACTUALITE APP] REQUEST SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[ACTUALITE APP] GET SOUS SECTEUR';

export const UPLOAD_ATTACHEMENT = '[ACTUALITE APP] UPLOAD ATTACHEMENT';
export const UPLOAD_REQUEST = '[ACTUALITE APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[ACTUALITE APP] UPLOAD ERROR';


export const REQUEST_DELETE = '[ACTUALITE APP] REQUEST DELETE';
export const DELETE_SUCCESS = '[ACTUALITE APP] DELETE SUCCESS';
export const ERROR_DELETE = '[ACTUALITE APP] ERROR DELETE';




export function getActualite(params) {

    const request = agent.get(`/api/actualites?slug=${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ACTUALITE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_ACTUALITE,
                payload: response.data['hydra:member']
            })
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    }

}

export function saveActualite(data) {

    if(data.image)
    data.image = data.image['@id'];
    
    const request = agent.post('/api/actualites', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Actualité enregistré avec succès' }));

            return dispatch({
                type: SAVE_ACTUALITE,
                payload: response.data
            })
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}

export function putActualite(data, url) {
    if(data.image)
    data.image = data.image['@id'];
    const request = agent.put(`/api/actualites/${url}`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Actualité modifié avec succès' }));

            return dispatch({
                type: SAVE_ACTUALITE,
                payload: response.data
            })
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}

export function deleteMedia(media) {

    const request = agent.delete(media['@id']);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DELETE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Document supprimé' }));

            return dispatch({
                type: DELETE_SUCCESS,
                id: media.id
            })
        }
        ).catch((error) => {
            dispatch({
                type: ERROR_DELETE,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}



export function uploadAttachement(file) {

    return (dispatch, getState) => {

        const formData = new FormData();
        formData.append("file", file);

        const request = agent.post('/api/actualite_images', formData, {
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
                    type: UPLOAD_ATTACHEMENT,
                    payload: response.data

                }),
                dispatch(showMessage({
                    message: 'Document téléchargé!', anchorOrigin: {
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




export function newActualite() {

    const data = {
        titre: '',
        description: '',
        source: '',
        image: null,
    };

    return {
        type: GET_ACTUALITE,
        payload: data
    }

}
