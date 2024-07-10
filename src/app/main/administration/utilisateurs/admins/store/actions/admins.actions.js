import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_ADMINS = '[ADMINS APP] GET ADMINS';
export const SET_SEARCH_TEXT = '[ADMINS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ADMINS = '[ADMINS APP] TOGGLE IN SELECTED ADMINS';
export const SELECT_ALL_ADMINS = '[ADMINS APP] SELECT ALL ADMINS';
export const DESELECT_ALL_ADMINS = '[ADMINS APP] DESELECT ALL ADMINS';
export const OPEN_NEW_ADMINS_DIALOG = '[ADMINS APP] OPEN NEW ADMINS DIALOG';
export const CLOSE_NEW_ADMINS_DIALOG = '[ADMINS APP] CLOSE NEW ADMINS DIALOG';
export const OPEN_EDIT_ADMINS_DIALOG = '[ADMINS APP] OPEN EDIT ADMINS DIALOG';
export const CLOSE_EDIT_ADMINS_DIALOG = '[ADMINS APP] CLOSE EDIT ADMINS DIALOG';
export const ADD_ADMIN = '[ADMINS APP] ADD ADMIN';
export const SAVE_ERROR = '[ADMINS APP] SAVE ERROR';
export const UPDATE_ADMIN = '[ADMINS APP] UPDATE ADMIN';
export const REMOVE_ADMIN = '[ADMINS APP] REMOVE ADMIN';
export const STATUT_ADMIN = '[ADMINS APP] TATUT ADMIN';
export const UPLOAD_IMAGE = '[ADMINS APP] UPLOAD IMAGE';
export const UPLOAD_REQUEST = '[ADMINS APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[ADMINS APP] UPLOAD ERROR';

export function getAdmins()
{
    const request = agent.get('/api/admins');

    return (dispatch) =>
        request.then((response) =>{
            
            dispatch({
                type   : GET_ADMINS,
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

export function toggleInSelectedAdmins(AdminsId)
{
    return {
        type: TOGGLE_IN_SELECTED_ADMINS,
        AdminsId
    }
}



export function openNewAdminsDialog()
{
    return {
        type: OPEN_NEW_ADMINS_DIALOG
    }
}

export function closeNewAdminsDialog()
{
    return {
        type: CLOSE_NEW_ADMINS_DIALOG
    }
}

export function openEditAdminsDialog(data)
{
    return {
        type: OPEN_EDIT_ADMINS_DIALOG,
        data
    }
}

export function closeEditAdminsDialog()
{
    return {
        type: CLOSE_EDIT_ADMINS_DIALOG
    }
}

export function addAdmin(newAdmin)
{
    if(newAdmin.avatar && newAdmin.avatar.url)
    newAdmin.avatar = newAdmin.avatar['@id'];
    return (dispatch, getState) => {

       
        const request = agent.post('/api/admins',newAdmin);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_ADMIN
                }),
                dispatch(showMessage({message: 'Admin bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getAdmins()))
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

export function updateAdmin(Admin)
{
    if(Admin.avatar && Admin.avatar.url)
    Admin.avatar = Admin.avatar['@id'];

    return (dispatch, getState) => {

     
        const request = agent.put(Admin['@id'],Admin);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_ADMIN
                }),
                dispatch(showMessage({message: 'Admin bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getAdmins()))
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

export function removeAdmin(Admin)
{
    
    let UpdateAdmin = {del :true,username : Admin.username+'_deleted-'+Admin.id,email : Admin.email+'_deleted-'+Admin.id}
    return (dispatch, getState) => {

        
        const request = agent.put(Admin['@id'],UpdateAdmin);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ADMIN
                }),
                dispatch(showMessage({message: 'Admin bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getAdmins()))
        );
    };
}

export function activeAccount(Admin,active)
{
    
    let UpdateAdmin = {isactif : active}
    return (dispatch, getState) => {

        
        const request = agent.put(Admin['@id'],UpdateAdmin);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: STATUT_ADMIN
                }),
                dispatch(showMessage({message: 'Statut modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getAdmins()))
        );
    };
}

export function uploadImage(file)
{
    
    return (dispatch, getState) => {

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
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: response.data

                }),
                dispatch(showMessage({message: 'Image uploaded!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ])
        ).catch((error)=>{
            dispatch({
                type: UPLOAD_ERROR,
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
        }

        );
    };
}



