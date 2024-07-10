import agent from "agent";
import {showMessage} from 'app/store/actions/fuse';

export const REQUEST_SECTEURS = '[SECTEURS APP ADMIN] REQUEST SECTEURS';
export const GET_SECTEURS = '[SECTEURS APP ADMIN] GET SECTEURS';
export const SET_SECTEURS_SEARCH_TEXT = '[SECTEURS APP ADMIN] SET SECTEURS SEARCH TEXT';
export const REMOVE_SECTEUR = '[SECTEURS APP] REMOVE SECTEUR';

export function setSearchText(event)
{
    return {
        type      : SET_SECTEURS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function getSecteurs() {
    const request = agent.get(`/api/secteurs?pagination=false&props[]=name&props[]=id&props[]=del&props[]=image`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_SECTEURS,
                payload: response.data
            })
        );
    }

}

export function setSecteursSearchText(event) {
    return {
        type: SET_SECTEURS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function removeSecteur(secteur)
{
    let data ={
        del:true,
        name:secteur.name+'_deleted-'+secteur.id
    }
    return (dispatch) => {

        dispatch({
            type: REQUEST_SECTEURS,
        });
        const request = agent.put(`/api/secteurs/${secteur.id}`,data);

        return request.then((response) =>
            Promise.all([
                dispatch(showMessage({message: 'secteur bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getSecteurs()))
        ).catch((error) => {
           
            if(error.response.data && error.response.data['hydra:description']){
                dispatch(showMessage({message: error.response.data['hydra:description'],anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'error'}));
               
            }
           
        }).then(() => dispatch(getSecteurs()));
    };
}

