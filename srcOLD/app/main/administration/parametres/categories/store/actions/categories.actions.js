import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_CATEGORIES = '[CATEGORIES APP] GET CATEGORIES';
export const GET_SOUS_SECTEURS = '[CATEGORIES APP] GET SOUS_SECTEURS';
export const REQUEST_CATEGORIES = '[CATEGORIES APP] REQUEST CATEGORIES';
export const SET_SEARCH_TEXT = '[CATEGORIES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CATEGORIES = '[CATEGORIES APP] TOGGLE IN SELECTED CATEGORIES';
export const SELECT_ALL_CATEGORIES = '[CATEGORIES APP] SELECT ALL CATEGORIES';
export const DESELECT_ALL_CATEGORIES = '[CATEGORIES APP] DESELECT ALL CATEGORIES';
export const OPEN_NEW_CATEGORIES_DIALOG = '[CATEGORIES APP] OPEN NEW CATEGORIES DIALOG';
export const CLOSE_NEW_CATEGORIES_DIALOG = '[CATEGORIES APP] CLOSE NEW CATEGORIES DIALOG';
export const OPEN_EDIT_CATEGORIES_DIALOG = '[CATEGORIES APP] OPEN EDIT CATEGORIES DIALOG';
export const CLOSE_EDIT_CATEGORIES_DIALOG = '[CATEGORIES APP] CLOSE EDIT CATEGORIES DIALOG';
export const ADD_CATEGORIE = '[CATEGORIES APP] ADD CATEGORIE';
export const SAVE_ERROR = '[CATEGORIES APP] SAVE ERROR';
export const UPDATE_CATEGORIE = '[CATEGORIES APP] UPDATE CATEGORIE';
export const REMOVE_CATEGORIE = '[CATEGORIES APP] REMOVE CATEGORIE';
export const SET_PARAMETRES_DATA = '[CATEGORIES APP] SET PARAMETRES DATA';

export function getSousSecteurs()
{
    const request = agent.get('/api/sous_secteurs?pagination=false&props[]=id&props[]=name');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_SOUS_SECTEURS,
                payload: response.data['hydra:member']
            })
        });
}




export function getCategories(parametres)
{
    var search = '';
    if (parametres.search.length > 0) {
        parametres.search.map(function (item, i) {
            search += '&' + item.id + '=' + item.value
        });
    }
    const request = agent.get(`/api/categories?page=${parametres.page}${search}&order[${parametres.filter.id}]=${parametres.filter.direction}&props[]=id&props[]=name&props[]=sousSecteurs`);

    
    return (dispatch) =>{
        dispatch({
            type   : REQUEST_CATEGORIES,
        });
        return  request.then((response) =>{
            dispatch({
                type   : GET_CATEGORIES,
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


export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}

export function openNewCategoriesDialog()
{
    return {
        type: OPEN_NEW_CATEGORIES_DIALOG
    }
}

export function closeNewCategoriesDialog()
{
    return {
        type: CLOSE_NEW_CATEGORIES_DIALOG
    }
}

export function openEditCategoriesDialog(data)
{
    return {
        type: OPEN_EDIT_CATEGORIES_DIALOG,
        data
    }
}

export function closeEditCategoriesDialog()
{
    return {
        type: CLOSE_EDIT_CATEGORIES_DIALOG
    }
}

export function addCategorie(categorie,parametres)
{
    let arr = null;
    if (categorie.sousSecteurs) {
        arr = categorie.sousSecteurs.map((item => { return item.value }));
    }
    const data = {
        ...categorie,
        sousSecteurs: arr
    }
    return (dispatch) => {

       
        const request = agent.post('/api/categories',data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CATEGORIE
                }),
                dispatch(showMessage({message: 'Catégorie bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getCategories(parametres)))
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

export function updateCategorie(categorie,parametres)
{
    let arr = null;
    if (categorie.sousSecteurs) {
        arr = categorie.sousSecteurs.map((item => { return item.value }));
    }
    const data = {
        ...categorie,
        sousSecteurs: arr
    }
    return (dispatch) => {

     
        const request = agent.put(`/api/categories/${categorie.id}`,data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CATEGORIE
                }),
                dispatch(showMessage({message: 'Catégorie bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getCategories(parametres)))
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

export function removeCategorie(categorie,parametres)
{
    
    let data = {
        del: true,
        name: categorie.name + '_deleted-' + categorie.id
    }
    return (dispatch) => {

        dispatch({
            type   : REQUEST_CATEGORIES,
        });
        const request = agent.put(`/api/categories/${categorie.id}`,data);

        return request.then((response) =>
            Promise.all([
                dispatch(showMessage({message: 'Catégorie bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getCategories(parametres)))
        ).catch((error) => {
            dispatch({
                type: REMOVE_CATEGORIE
            })
            if (error.response.data && error.response.data['hydra:description']) {
                dispatch(showMessage({
                    message: error.response.data['hydra:description'], anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'
                }));

            }

        });
    };
}



