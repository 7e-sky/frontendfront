import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_MOTIFS = '[MOTIFS APP] GET MOTIFS';
export const SET_SEARCH_TEXT = '[MOTIFS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_MOTIFS = '[MOTIFS APP] TOGGLE IN SELECTED MOTIFS';
export const SELECT_ALL_MOTIFS = '[MOTIFS APP] SELECT ALL MOTIFS';
export const DESELECT_ALL_MOTIFS = '[MOTIFS APP] DESELECT ALL MOTIFS';
export const OPEN_NEW_MOTIFS_DIALOG = '[MOTIFS APP] OPEN NEW MOTIFS DIALOG';
export const CLOSE_NEW_MOTIFS_DIALOG = '[MOTIFS APP] CLOSE NEW MOTIFS DIALOG';
export const OPEN_EDIT_MOTIFS_DIALOG = '[MOTIFS APP] OPEN EDIT MOTIFS DIALOG';
export const CLOSE_EDIT_MOTIFS_DIALOG = '[MOTIFS APP] CLOSE EDIT MOTIFS DIALOG';
export const ADD_MOTIF = '[MOTIFS APP] ADD MOTIF';
export const SAVE_ERROR = '[MOTIFS APP] SAVE ERROR';
export const UPDATE_MOTIF = '[MOTIFS APP] UPDATE MOTIF';
export const REMOVE_MOTIF = '[MOTIFS APP] REMOVE MOTIF';


export function getMotifs()
{
    const request = agent.get('/api/motifs');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_MOTIFS,
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


export function openNewMotifsDialog()
{
    return {
        type: OPEN_NEW_MOTIFS_DIALOG
    }
}

export function closeNewMotifsDialog()
{
    return {
        type: CLOSE_NEW_MOTIFS_DIALOG
    }
}

export function openEditMotifsDialog(data)
{
    return {
        type: OPEN_EDIT_MOTIFS_DIALOG,
        data
    }
}

export function closeEditMotifsDialog()
{
    return {
        type: CLOSE_EDIT_MOTIFS_DIALOG
    }
}

export function addMotif(newMotif)
{
    
    return (dispatch, getState) => {

       
        const request = agent.post('/api/motifs',newMotif);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_MOTIF
                }),
                dispatch(showMessage({message: 'Motif bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getMotifs()))
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

export function updateMotif(Motif)
{
    return (dispatch, getState) => {

     
        const request = agent.put(Motif['@id'],Motif);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_MOTIF
                }),
                dispatch(showMessage({message: 'Motif bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getMotifs()))
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

export function removeMotif(Motif)
{
    return (dispatch, getState) => {

        
        const request = agent.delete(Motif['@id']);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_MOTIF
                }),
                dispatch(showMessage({message: 'Motif bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getMotifs()))
        );
    };
}



