import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] REQUEST FOURNISSEUR';
export const GET_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] GET FOURNISSEUR';
export const GET_PAYS = '[FOURNISSEURS ADMIN APP] GET PAYS';
export const GET_VILLES = '[FOURNISSEURS ADMIN APP] GET VILLES';
export const REQUEST_PAYS = '[FOURNISSEURS ADMIN APP] REQUEST PAYS';

export const REQUEST_ADD_VILLE = '[FOURNISSEURS ADMIN APP] REQUEST_ADD_VILLE';
export const SAVE_ADD_VILLE = '[FOURNISSEURS ADMIN APP] SAVE_ADD_VILLE';
export const SAVE_ERROR_ADD_VILLE = '[FOURNISSEURS ADMIN APP] SAVE_ERROR_ADD_VILLE';
export const CLEAN_UP_VILLE = '[FOURNISSEURS ADMIN APP] CLEAN_UP_VILLE';

export const REQUEST_VILLES = '[FOURNISSEURS ADMIN APP] REQUEST VILLES';
export const SAVE_ERROR = '[FOURNISSEURS ADMIN APP] SAVE ERROR';
export const UPDATE_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] UPDATE FOURNISSEUR';
export const REQUEST_UPDATE_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] REQUEST UPDATE_FOURNISSEUR';

export const REQUEST_ADD_SECTEUR = '[FOURNISSEURS ADMIN APP] REQUEST_ADD_SECTEUR';
export const SAVE_ADD_SECTEUR = '[FOURNISSEURS ADMIN APP] SAVE_ADD_SECTEUR';
export const SAVE_ERROR_ADD_SECTEUR = '[FOURNISSEURS ADMIN APP] SAVE_ERROR_ADD_SECTEUR';

export const REQUEST_ADD_PRODUIT = '[FOURNISSEURS ADMIN APP] REQUEST_ADD_PRODUIT';
export const SAVE_ADD_PRODUIT = '[FOURNISSEURS ADMIN APP] SAVE_ADD_PRODUIT';
export const SAVE_ERROR_ADD_PRODUIT = '[FOURNISSEURS ADMIN APP] SAVE_ERROR_ADD_PRODUIT';

export const REQUEST_SOUS_SECTEUR = '[FOURNISSEURS ADMIN APP] REQUEST_SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[FOURNISSEURS ADMIN APP] GET_SOUS_SECTEUR';

export const UPLOAD_AVATAR = '[FOURNISSEURS ADMIN APP] UPLOAD AVATAR';
export const UPLOAD_REQUEST = '[FOURNISSEURS ADMIN APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[FOURNISSEURS ADMIN APP] UPLOAD ERROR';

export const REQUEST_SECTEUR = '[FOURNISSEURS ADMIN APP] REQUEST SECTEUR';
export const GET_SECTEUR = '[FOURNISSEURS ADMIN APP] GET SECTEUR';

export const REQUEST_PRODUITS = '[FOURNISSEURS ADMIN APP] REQUEST PRODUITS';
export const GET_PRODUITS = '[FOURNISSEURS ADMIN APP] GET PRODUITS';

export const REQUEST_ABONNEMENTS = '[FOURNISSEURS ADMIN APP] REQUEST ABONNEMENTS';
export const GET_ABONNEMENTS = '[FOURNISSEURS ADMIN APP] GET ABONNEMENTS';

export const REQUEST_JETONS = '[FOURNISSEURS ADMIN APP] REQUEST JETONS';
export const GET_JETONS = '[FOURNISSEURS ADMIN APP] GET JETONS';

export const REQUEST_BLACKLISTES = '[FOURNISSEURS ADMIN APP] REQUEST BLACKLISTES';
export const GET_BLACKLISTES = '[FOURNISSEURS ADMIN APP] GET BLACKLISTES';

export const CLEAN_UP_FOURNISSEUR = '[FOURNISSEUR ADMIN APP] CLEAN_UP_FOURNISSEUR';

export const SET_PARAMETRES_DETAIL = '[FOURNISSEUR ADMIN APP] SET PARAMETRES DETAIL';

export const CLEAN_UP_ACHETEUR = '[ACHETEUR ADMIN APP] CLEAN_UP_ACHETEUR';

export function setParametresDetail(parametres) {
    return {
        type: SET_PARAMETRES_DETAIL,
        parametres
    }
}

export function cleanUpFournisseur() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_FOURNISSEUR,
    });
}
export function cleanUpAddedVille() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_VILLE,
    });
}

export function getFournisseur(id_fournisseur) {
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

export function getProduitsByFrs(id, parametres) {
    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map((item) => (
            item.value && (
                item.id === 'created' ? (search += '&' + item.id + '[after]=' + item.value) : (search += '&' + item.id + '=' + item.value))
        ));
    }
    const request = agent.get(`/api/fournisseurs/${id}/produits?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUITS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_PRODUITS,
                payload: response.data
            })
        );
    }

}

export function getAbonnements(id) {

    const request = agent.get(`/api/fournisseurs/${id}/abonnements?pagination=false&order[expired]=desc`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ABONNEMENTS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_ABONNEMENTS,
                payload: response.data
            })
        );
    }

}

export function getJetons(id) {

    const request = agent.get(`/api/fournisseurs/${id}/jetons?pagination=false&order[created]=desc`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_JETONS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_JETONS,
                payload: response.data
            })
        );
    }

}


export function getBlackListes(id) {

    const request = agent.get(`/api/fournisseurs/${id}/blacklistes?order[created]=desc`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_BLACKLISTES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_BLACKLISTES,
                payload: response.data
            })
        );
    }

}


export function addSecteur(name) {
    const data = {
        name
    }
    const request = agent.post('/api/secteurs', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: SAVE_ADD_SECTEUR,
            });
            dispatch(
                showMessage({
                    message: 'Secteur bien ajouté!',//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'//success error info warning null
                }));
            dispatch(getSecteurs());
        }).catch((error) => {
            dispatch({
                type: SAVE_ERROR_ADD_SECTEUR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
        });

    }

}
export function addActivite(secteur, name) {
    const data = {
        secteur,
        name
    }
    const request = agent.post('/api/sous_secteurs', data);

    return (dispatch) => {

        return request.then((response) => {

            dispatch(
                showMessage({
                    message: 'Activité bien ajoutée!',//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'//success error info warning null
                }));
            dispatch(getSousSecteurs(secteur));
        }).catch((error) => {
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
        });

    }

}
export function addProduit(activite, name) {
    const data = {
        name,
        sousSecteurs: [activite]
    }
    const request = agent.post('/api/categories', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_PRODUIT,
        });
        return request.then((response) => {
            dispatch({
                type: SAVE_ADD_PRODUIT,
                payload: response.data

            });
            dispatch(
                showMessage({
                    message: 'Produit bien ajouté!',//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'//success error info warning null
                }));
        }).catch((error) => {
            dispatch({
                type: SAVE_ERROR_ADD_SECTEUR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
        });

    }

}
export function getSecteurs() {
    const request = agent.get('/api/secteurs?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SECTEUR,
                payload: response.data
            })
        });

    }

}
export function getSousSecteurs(url) {
    const request = agent.get(`${url}/sous_secteurs?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
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
export function addVille(name, pays_id, fournisseur_id) {

    let data = {
        name,
        pays: `/api/pays/${pays_id}`
    }

    const request = agent.post(`/api/villes`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_VILLE,
        });
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) => {
            dispatch(getVilles(`/api/pays/${pays_id}`));
            let data = {
                ville: response.data['@id'],
                autreVille: null
            }
            const request2 = agent.put(`/api/fournisseurs/${fournisseur_id}`, data);
            return request2.then((response) => {
                dispatch(Actions.getCountForBadge('fournisseurs-admin'));
                dispatch(Actions.getCountForBadge('fournisseurs-collaps'));
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                })
                dispatch({
                    type: SAVE_ADD_VILLE,
                });
            });
        }).catch((error) => {
            dispatch({
                type: SAVE_ERROR_ADD_VILLE,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
        });

    }

}

export function viderAutreCategories(id_fournisseur) {
    const data = {
        autreCategories: null
    }
    const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) => {
            dispatch({
                type: UPDATE_FOURNISSEUR,
                payload: response.data
            });
            dispatch(Actions.getCountForBadge('fournisseurs-admin'));
            dispatch(Actions.getCountForBadge('fournisseurs-collaps'));

        }).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
        });

    }

}




export function updateSocieteInfo(data, id_fournisseur) {

    let putData = {
        ...data,
        ice: data.pays.label !== 'Maroc' ? null : data.ice,
        pays: data.pays.value,
        ville: data.ville.value,
        codepostal: data.codepostal ? parseInt(data.codepostal) : null,
    }
    if (putData.codepostal === null) {
        delete putData.codepostal;
    }

    return (dispatch) => {

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
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };

}

export function etatFournisseur(fournisseur, active) {

    let Updatefournisseur = { isactif: active }
    return (dispatch) => {
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        const request = agent.put(fournisseur['@id'], Updatefournisseur);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Statut modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        );
    };
}

export function updateSocieteSousSecteurs(categories, id_fournisseur) {

    var putData = {
        categories: _.map(categories, function (value, key) {
            return value['@id'];
        })
    }
    return (dispatch) => {

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
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}

export function updateUserInfo(data, id_fournisseur) {

    return (dispatch) => {

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
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}


export function uploadAvatar(file, id_fournisseur) {

    return (dispatch) => {

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



    return (dispatch) => {

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

