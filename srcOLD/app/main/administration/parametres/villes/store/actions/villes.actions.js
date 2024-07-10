import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';
export const GET_PAYS = '[PAYS APP] GET PAYS';
export const GET_VILLES = '[VILLES APP] GET VILLES';
export const REQUEST_VILLES = '[VILLES APP] REQUEST VILLES';
export const SET_SEARCH_TEXT = '[VILLES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_VILLES = '[VILLES APP] TOGGLE IN SELECTED VILLES';
export const SELECT_ALL_VILLES = '[VILLES APP] SELECT ALL VILLES';
export const DESELECT_ALL_VILLES = '[VILLES APP] DESELECT ALL VILLES';
export const OPEN_NEW_VILLES_DIALOG = '[VILLES APP] OPEN NEW VILLES DIALOG';
export const CLOSE_NEW_VILLES_DIALOG = '[VILLES APP] CLOSE NEW VILLES DIALOG';
export const OPEN_EDIT_VILLES_DIALOG = '[VILLES APP] OPEN EDIT VILLES DIALOG';
export const CLOSE_EDIT_VILLES_DIALOG = '[VILLES APP] CLOSE EDIT VILLES DIALOG';
export const ADD_VILLE = '[VILLES APP] ADD VILLE';
export const SAVE_ERROR = '[VILLES APP] SAVE ERROR';
export const UPDATE_VILLE = '[VILLES APP] UPDATE VILLE';
export const REMOVE_VILLE = '[VILLES APP] REMOVE VILLE';
export const SET_PARAMETRES_DATA = '[SOUS_SECTEURS APP] SET PARAMETRES DATA';

export function getPays()
{
    const request = agent.get('/api/pays?pagination=false&props[]=id&props[]=name');

    return (dispatch) =>
        request.then((response) =>{
            
            dispatch({
                type   : GET_PAYS,
                payload: response.data['hydra:member']
            })
        });
}


export function getVilles(parametres)
{

    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map(function (item, i) {
            search += '&' + item.id + '=' + item.value
        });
    }
    const request = agent.get(`/api/villes?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}&props[]=id&props[]=name&props[]=pays`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_VILLES,
        });
        return request.then((response) =>{
            dispatch({
                type   : GET_VILLES,
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


export function openNewVillesDialog()
{
    return {
        type: OPEN_NEW_VILLES_DIALOG
    }
}

export function closeNewVillesDialog()
{
    return {
        type: CLOSE_NEW_VILLES_DIALOG
    }
}

export function openEditVillesDialog(data)
{
    return {
        type: OPEN_EDIT_VILLES_DIALOG,
        data
    }
}

export function closeEditVillesDialog()
{
    return {
        type: CLOSE_EDIT_VILLES_DIALOG
    }
}

export function addVille(newVille,parametres)
{
    newVille.pays = newVille.pays.value;
    return (dispatch) => {
        dispatch({
            type   : REQUEST_VILLES,
        });
       
        const request = agent.post('/api/villes',newVille);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_VILLE
                }),
                dispatch(showMessage({message: 'Ville bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getVilles(parametres)))
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

export function updateVille(ville,parametres)
{
    ville.pays = ville.pays.value;
    return (dispatch) => {
        dispatch({
            type   : REQUEST_VILLES,
        });
     
        const request = agent.put(ville['@id'],ville);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_VILLE
                }),
                dispatch(showMessage({message: 'Ville bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getVilles(parametres)))
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

export function removeVille(ville,parametres)
{
   
    let data = {
        del:true,
        name:ville.name+'_deleted-'+ville.id
    }
    return (dispatch) => {

        dispatch({
            type   : REQUEST_VILLES,
        });
        const request = agent.put(ville['@id'],data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_VILLE
                }),
                dispatch(showMessage({message: 'Ville bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getVilles(parametres)))
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

export function setParametresData(parametres)
{
    return {
        type      : SET_PARAMETRES_DATA,
        parametres
    }
}



