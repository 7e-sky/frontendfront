import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';
export const GET_FAQ_CATEGORIES = '[FAQ_CATEGORIES APP] GET FAQ_CATEGORIES';
export const REQUEST_FAQ_CATEGORIES = '[FAQ_CATEGORIES APP] REQUEST FAQ_CATEGORIES';
export const SET_SEARCH_TEXT = '[FAQ_CATEGORIES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_FAQ_CATEGORIES = '[FAQ_CATEGORIES APP] TOGGLE IN SELECTED FAQ_CATEGORIES';
export const SELECT_ALL_FAQ_CATEGORIES = '[FAQ_CATEGORIES APP] SELECT ALL FAQ_CATEGORIES';
export const DESELECT_ALL_FAQ_CATEGORIES = '[FAQ_CATEGORIES APP] DESELECT ALL FAQ_CATEGORIES';
export const OPEN_NEW_FAQ_CATEGORIES_DIALOG = '[FAQ_CATEGORIES APP] OPEN NEW FAQ_CATEGORIES DIALOG';
export const CLOSE_NEW_FAQ_CATEGORIES_DIALOG = '[FAQ_CATEGORIES APP] CLOSE NEW FAQ_CATEGORIES DIALOG';
export const OPEN_EDIT_FAQ_CATEGORIES_DIALOG = '[FAQ_CATEGORIES APP] OPEN EDIT FAQ_CATEGORIES DIALOG';
export const CLOSE_EDIT_FAQ_CATEGORIES_DIALOG = '[FAQ_CATEGORIES APP] CLOSE EDIT FAQ_CATEGORIES DIALOG';
export const ADD_FAQ_CATEGORIE = '[FAQ_CATEGORIES APP] ADD FAQ_CATEGORIE';
export const SAVE_ERROR = '[FAQ_CATEGORIES APP] SAVE ERROR';
export const UPDATE_FAQ_CATEGORIE = '[FAQ_CATEGORIES APP] UPDATE FAQ_CATEGORIE';
export const REMOVE_FAQ_CATEGORIE = '[FAQ_CATEGORIES APP] REMOVE FAQ_CATEGORIE';



export function getFaqCategories()
{

    const request = agent.get(`/api/faq_categories`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_FAQ_CATEGORIES,
        });
        return request.then((response) =>{
            dispatch({
                type   : GET_FAQ_CATEGORIES,
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


export function openNewFaqCategorieDialog()
{
    return {
        type: OPEN_NEW_FAQ_CATEGORIES_DIALOG
    }
}

export function closeNewFaqCategorieDialog()
{
    return {
        type: CLOSE_NEW_FAQ_CATEGORIES_DIALOG
    }
}

export function openEditFaqCategorieDialog(data)
{
    return {
        type: OPEN_EDIT_FAQ_CATEGORIES_DIALOG,
        data
    }
}

export function closeEditFaqCategorieDialog()
{
    return {
        type: CLOSE_EDIT_FAQ_CATEGORIES_DIALOG
    }
}

export function addCategorie(newFaqCategorie)
{
    return (dispatch) => {

       
        const request = agent.post('/api/faq_categories',newFaqCategorie);
        dispatch({
            type   : REQUEST_FAQ_CATEGORIES,
        })
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_FAQ_CATEGORIE
                }),
                dispatch(showMessage({message: 'Catégorie bien ajoutée!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getFaqCategories()))
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

export function updateCategorie(FaqCategorie)
{
    return (dispatch) => {

     
        const request = agent.put(FaqCategorie['@id'],FaqCategorie);
        dispatch({
            type   : REQUEST_FAQ_CATEGORIES,
        })
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FAQ_CATEGORIE
                }),
                dispatch(showMessage({message: 'Catégorie bien modifiée!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getFaqCategories()))
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

export function removeCategorie(FaqCategorie)
{
    return (dispatch) => {
        const request = agent.delete(FaqCategorie['@id']);
        dispatch({
            type   : REQUEST_FAQ_CATEGORIES,
        })
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_FAQ_CATEGORIE
                }),
                
                dispatch(showMessage({message: 'Catégorie bien supprimée!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getFaqCategories()))
        );
    };
}




