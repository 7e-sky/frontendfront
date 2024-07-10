import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';

export const REQUEST_SUGGESTION = '[SUGGESTION SUGGESTION APP ADMIN] REQUEST SUGGESTION';
export const REQUEST_SECTEUR = '[SUGGESTION SUGGESTION APP ADMIN] REQUEST SECTEUR';
export const REQUEST_SOUS_SECTEUR = '[SUGGESTION SUGGESTION APP ADMIN] REQUEST SOUS_SECTEUR';
export const REQUEST_CATEGORIE = '[SUGGESTION SUGGESTION APP ADMIN] REQUEST CATEGORIE';
export const GET_SUGGESTION = '[SUGGESTION SUGGESTION APP ADMIN] GET SUGGESTION';
export const GET_SECTEUR = '[SUGGESTION SUGGESTION APP ADMIN] GET SECTEUR';
export const GET_SOUS_SECTEUR = '[SUGGESTION SUGGESTION APP ADMIN] GET SOUS_SECTEUR';
export const GET_CATEGORIE = '[SUGGESTION SUGGESTION APP ADMIN] GET CATEGORIE';
export const SAVE_ERROR = '[SUGGESTION SUGGESTION APP ADMIN] SAVE ERROR';
export const SAVE_SUGGESTION = '[SUGGESTION SUGGESTION APP ADMIN] UPDATE SUGGESTION';
export const REQUEST_SAVE_SUGGESTION = '[SUGGESTION SUGGESTION APP ADMIN] REQUEST SAVE_SUGGESTION';
export const CLEAN_UP = '[SUGGESTION SUGGESTION APP ADMIN] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}


export function getSuggestion(id_suggestion) {
    const request = agent.get(`/api/suggestion_secteurs/${id_suggestion}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SUGGESTION,
        });
        return request.then((response) => {
            response.data.secteur && dispatch(getSecteur(response.data.secteur));
            response.data.sousSecteur && dispatch(getSousSecteur(response.data.sousSecteur));
            response.data.categorie && dispatch(getCategorie(response.data.categorie));
            dispatch({
                type: GET_SUGGESTION,
                payload: response.data
            })
        });

    }

}
export function saveSecteur(name) {

    let data = {
        name
    }

    const request = agent.post('/api/secteurs', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEUR,
        });
        return request.then((response) => {
            dispatch(showMessage({
                message: 'Secteur ajouté',
                autoHideDuration: 6000,//ms
                anchorOrigin: {
                    vertical: 'top',//top bottom
                    horizontal: 'center'//left center right
                },
                variant: 'success'//success error info warning null
            }));
            dispatch({
                type: GET_SECTEUR,
                payload: response.data
            })
        }
        );
    }

}

export function getSecteur(secteur) {

    const request = agent.get(`/api/secteurs?name=${secteur}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SECTEUR,
                payload: response.data['hydra:member'][0]
            })
        });

    }

}


export function saveSousSecteur(name, secteur) {

    let data = {
        name,
        secteur
    }

    const request = agent.post('/api/sous_secteurs', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch(showMessage({
                message: 'Activité ajoutée',
                autoHideDuration: 6000,//ms
                anchorOrigin: {
                    vertical: 'top',//top bottom
                    horizontal: 'center'//left center right
                },
                variant: 'success'//success error info warning null
            }));
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data
            })
        }
        );
    }

}




export function getSousSecteur(sous_secteur) {
    const request = agent.get(`/api/sous_secteurs?name=${sous_secteur}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data['hydra:member'][0]
            })
        });

    }

}

export function saveCategorie(name, sous_secteur) {

    let data = {
        name,
        sousSecteurs: [sous_secteur]
    }

    const request = agent.post('/api/categories', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CATEGORIE,
        });
        return request.then((response) => {
            dispatch(showMessage({
                message: 'Catégorie ajoutée',
                autoHideDuration: 6000,//ms
                anchorOrigin: {
                    vertical: 'top',//top bottom
                    horizontal: 'center'//left center right
                },
                variant: 'success'//success error info warning null
            }));
            dispatch({
                type: GET_CATEGORIE,
                payload: response.data
            })
        }
        );
    }

}
export function getCategorie(categorie) {
    const request = agent.get(`/api/categories?name=${categorie}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CATEGORIE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_CATEGORIE,
                payload: response.data['hydra:member'][0]
            })
        });

    }

}

export function updateSecteur(data, history) {


    return (dispatch, getState) => {

        const request = agent.put(data['@id'], data);
        dispatch({
            type: REQUEST_SAVE_SUGGESTION,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: SAVE_SUGGESTION,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                })),
                history.push('/parametres/suggestions')
            ])
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };

}

