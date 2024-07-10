import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_PAYS = '[PAYS APP] GET PAYS';
export const REQUEST_PAYS = '[PAYS APP] REQUEST PAYS';
export const SET_SEARCH_TEXT = '[PAYS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PAYS = '[PAYS APP] TOGGLE IN SELECTED PAYS';
export const SELECT_ALL_PAYS = '[PAYS APP] SELECT ALL PAYS';
export const DESELECT_ALL_PAYS = '[PAYS APP] DESELECT ALL PAYS';
export const OPEN_NEW_PAYS_DIALOG = '[PAYS APP] OPEN NEW PAYS DIALOG';
export const CLOSE_NEW_PAYS_DIALOG = '[PAYS APP] CLOSE NEW PAYS DIALOG';
export const OPEN_EDIT_PAYS_DIALOG = '[PAYS APP] OPEN EDIT PAYS DIALOG';
export const CLOSE_EDIT_PAYS_DIALOG = '[PAYS APP] CLOSE EDIT PAYS DIALOG';
export const ADD_PAYS = '[PAYS APP] ADD PAYS';
export const SAVE_ERROR = '[PAYS APP] SAVE ERROR';
export const UPDATE_PAYS = '[PAYS APP] UPDATE PAYS';
export const REMOVE_PAYS = '[PAYS APP] REMOVE PAYS';
export const REMOVE_PAYSS = '[PAYS APP] REMOVE PAYSS';
export const SET_PARAMETRES_DATA = '[SOUS_SECTEURS APP] SET PARAMETRES DATA';


export function getPays(parametres)
{

    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map(function (item, i) {
            search += '&' + item.id + '=' + item.value
        });
    }
    const request = agent.get(`/api/pays?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_PAYS,
        });
        return request.then((response) =>{
            
            dispatch({
                type   : GET_PAYS,
                payload: response.data
            })
        });
    }
        
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedPays(PaysId)
{
    return {
        type: TOGGLE_IN_SELECTED_PAYS,
        PaysId
    }
}

export function selectAllPays()
{
    return {
        type: SELECT_ALL_PAYS
    }
}

export function deSelectAllPays()
{
    return {
        type: DESELECT_ALL_PAYS
    }
}

export function openNewPaysDialog()
{
    return {
        type: OPEN_NEW_PAYS_DIALOG
    }
}

export function closeNewPaysDialog()
{
    return {
        type: CLOSE_NEW_PAYS_DIALOG
    }
}

export function openEditPaysDialog(data)
{
    return {
        type: OPEN_EDIT_PAYS_DIALOG,
        data
    }
}

export function closeEditPaysDialog()
{
    return {
        type: CLOSE_EDIT_PAYS_DIALOG
    }
}

export function addPays(newPays,parametres)
{
    
    return (dispatch, getState) => {

       
        const request = agent.post('/api/pays',newPays);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_PAYS
                }),
                dispatch(showMessage({message: 'Pays bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getPays(parametres)))).catch((error)=>{
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

export function updatePays(pays,parametres)
{
    
    return (dispatch, getState) => {

     
        const request = agent.put(pays['@id'],pays);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PAYS
                }),
                dispatch(showMessage({message: 'Pays bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getPays(parametres)))
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

export function removePays(pays,parametres)
{
    let data ={
        del:true,
        name :pays.name+'_deleted-'+pays.id
    }
    return (dispatch) => {

        dispatch({
            type   : REQUEST_PAYS,
        });
        const request = agent.put(`/api/pays/${pays.id}`,data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PAYS
                }),
                dispatch(showMessage({message: 'Pays bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getPays(parametres)))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message     : _.map(FuseUtils.parseApiErrors(error), function(value, key) {
                        return value;
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


export function removePayss(PaysIds)
{
    return (dispatch, getState) => {

        const request = agent.post('', {
            PaysIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PAYSS
                }),
                dispatch({
                    type: DESELECT_ALL_PAYS
                })
            ]).then(() => dispatch(getPays()))
        );
    };
}

export function setParametresData(parametres)
{
    return {
        type      : SET_PARAMETRES_DATA,
        parametres
    }
}

