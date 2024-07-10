import agent from "agent";
import {showMessage} from 'app/store/actions/fuse';

export const REQUEST_SUGGESTIONS = '[SUGGESTION SUGGESTIONS APP ADMIN] REQUEST SUGGESTION SUGGESTIONS';
export const GET_SUGGESTIONS = '[SUGGESTION SUGGESTIONS APP ADMIN] GET SUGGESTION SUGGESTIONS';
export const SET_SUGGESTIONS_SEARCH_TEXT = '[SUGGESTION SUGGESTIONS APP ADMIN] SET SUGGESTION SUGGESTIONS SEARCH TEXT';
export const REMOVE_SECTEUR = '[SUGGESTION SUGGESTIONS APP] REMOVE SECTEUR';

export function setSearchText(event)
{
    return {
        type      : SET_SUGGESTIONS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function getSuggestions() {
    const request = agent.get(`/api/suggestion_secteurs?etat=false`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SUGGESTIONS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_SUGGESTIONS,
                payload: response.data
            })
        );
    }

}

export function setSuggestionSearchText(event) {
    return {
        type: SET_SUGGESTIONS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function removeSuggestion(secteur)
{
  
    return (dispatch) => {

        dispatch({
            type: REQUEST_SUGGESTIONS,
        });
        const request = agent.delete(`/api/suggestion_secteurs/${secteur.id}`);

        return request.then((response) =>
            Promise.all([
                dispatch(showMessage({message: 'Suggestion bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getSuggestions()))
        ).catch((error) => {
            if(error.response.data && error.response.data['hydra:description']){
                dispatch(showMessage({message: error.response.data['hydra:description'],anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'error'}));
            }
        }).then(() => dispatch(getSuggestions()));
    };
}

