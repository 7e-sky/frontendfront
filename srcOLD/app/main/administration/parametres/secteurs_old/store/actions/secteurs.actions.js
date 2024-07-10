import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_SECTEURS = '[SECTEURS APP] GET SECTEURS';
export const SET_SEARCH_TEXT = '[SECTEURS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SECTEURS = '[SECTEURS APP] TOGGLE IN SELECTED SECTEURS';
export const SELECT_ALL_SECTEURS = '[SECTEURS APP] SELECT ALL SECTEURS';
export const DESELECT_ALL_SECTEURS = '[SECTEURS APP] DESELECT ALL SECTEURS';
export const OPEN_NEW_SECTEURS_DIALOG = '[SECTEURS APP] OPEN NEW SECTEURS DIALOG';
export const CLOSE_NEW_SECTEURS_DIALOG = '[SECTEURS APP] CLOSE NEW SECTEURS DIALOG';
export const OPEN_EDIT_SECTEURS_DIALOG = '[SECTEURS APP] OPEN EDIT SECTEURS DIALOG';
export const CLOSE_EDIT_SECTEURS_DIALOG = '[SECTEURS APP] CLOSE EDIT SECTEURS DIALOG';
export const ADD_SECTEUR = '[SECTEURS APP] ADD SECTEUR';
export const SAVE_ERROR = '[SECTEURS APP] SAVE ERROR';
export const UPDATE_SECTEUR = '[SECTEURS APP] UPDATE SECTEUR';
export const REMOVE_SECTEUR = '[SECTEURS APP] REMOVE SECTEUR';


export function getSecteurs()
{
    const request = agent.get('/api/secteurs');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_SECTEURS,
                payload: response.data['hydra:member']
            })
        });
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openNewSecteursDialog()
{
    return {
        type: OPEN_NEW_SECTEURS_DIALOG
    }
}

export function closeNewSecteursDialog()
{
    return {
        type: CLOSE_NEW_SECTEURS_DIALOG
    }
}

export function openEditSecteursDialog(data)
{
    return {
        type: OPEN_EDIT_SECTEURS_DIALOG,
        data
    }
}

export function closeEditSecteursDialog()
{
    return {
        type: CLOSE_EDIT_SECTEURS_DIALOG
    }
}

export function addSecteur(newSecteur)
{
    
    return (dispatch, getState) => {

       
        const request = agent.post('/api/secteurs',newSecteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_SECTEUR
                }),
                dispatch(showMessage({message: 'Secteur bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getSecteurs()))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message     : _.map(FuseUtils.parseApiErrors(error), function(value, key) {
                        return key+': '+value;
                      }) ,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}

export function updateSecteur(Secteur)
{
    return (dispatch, getState) => {

     
        const request = agent.put(Secteur['@id'],Secteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_SECTEUR
                }),
                dispatch(showMessage({message: 'Secteur bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getSecteurs()))
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,

            });
            dispatch(
                showMessage({
                    message     : _.map(FuseUtils.parseApiErrors(error), function(value, key) {
                        return key+': '+value;
                      }) ,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}

export function removeSecteur(Secteur)
{
    Secteur.del=true;
    Secteur.name=Secteur.name+'_deleted-'+Secteur.id;
    return (dispatch, getState) => {

        
        const request = agent.put(Secteur['@id'],Secteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_SECTEUR
                }),
                dispatch(showMessage({message: 'Secteur bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getSecteurs()))
        );
    };
}



