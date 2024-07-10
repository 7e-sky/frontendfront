import { showMessage } from 'app/store/actions/fuse';
import agent from "agent";
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_CHILDS = '[CHILD FOURNISSEUR APP] REQUEST CHILDS';
export const REQUEST_EDIT = '[CHILD FOURNISSEUR APP] REQUEST EDIT';
export const EDITED_FRS = '[CHILD FOURNISSEUR APP] EDITED FRS';
export const GET_CHILDS = '[CHILD FOURNISSEUR APP] GET CHILD';

export function getChilds(id) {
    const request = agent.get(`/api/fournisseurs/${id}/childs?type=0`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CHILDS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_CHILDS,
                payload: response.data
            })
        );
    }

}
export function updateType(id, type, id_fournisseur) {

    let updateData = { type }
    const request = agent.put(`/api/fournisseur_provisoires/${id}`, updateData);

    return (dispatch) => {
        dispatch({
            type: REQUEST_EDIT,
        });
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: EDITED_FRS
                }),

                dispatch(showMessage({
                    message: type === 1 ? 'Agence / Service bien ajoutée!' : 'Fournisseur bien ajouté!',
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getChilds(id_fournisseur))).then(() => dispatch(Actions.getCountForBadge('fournisseurs-tentatives')))
        ).catch((error) => {
            if (error.response.data && error.response.data['hydra:description']) {
                dispatch(showMessage({
                    message: error.response.data['hydra:description'], anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'
                }));

            }
        });;
    };
}

export function removeTentative(tentative, user) {

    return (dispatch) => {
        dispatch({
            type: REQUEST_EDIT,
        });
        const request = agent.delete(`/api/fournisseur_provisoires/${tentative.id}`);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: EDITED_FRS
                }),
                dispatch(showMessage({
                    message: 'Bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getChilds(user.id))).then(() => dispatch(Actions.getCountForBadge('fournisseurs-tentatives')))
        );
    };
}







