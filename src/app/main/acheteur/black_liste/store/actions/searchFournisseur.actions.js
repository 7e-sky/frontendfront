import agent from "agent";
import axios from "axios";

export const SF_SET_SEARCH_TEXT = '[SEARCH FOURNISSEURAPP] SF_SET_SEARCH_TEXT';
export const REQUEST_DATA = '[SEARCH FOURNISSEURAPP] REQUEST_DATA';
export const GET_DATA = '[SEARCH FOURNISSEURAPP] GET_DATA';
export const SF_OPEN = '[SEARCH FOURNISSEURAPP] SF_OPEN';
export const SF_CLOSE = '[SEARCH FOURNISSEURAPP] SF_CLOSE';
export const CLEAN_UP = '[SEARCH FOURNISSEURAPP] CLEAN_UP';
export const NO_SUGGESTIONS = '[SEARCH FOURNISSEURAPP] NO_SUGGESTIONS';

const CancelToken = axios.CancelToken;
let cancel;
let timeOut;

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function loadSuggestions(value) {
    timeOut && clearTimeout(timeOut)
    return (dispatch) => {
        dispatch({
            type: REQUEST_DATA,
        });

        // Fake an AJAX call
        timeOut= setTimeout(() => {
            dispatch(getResults(value));
        }, randomDelay());
    };
}
function randomDelay() {
    return 300 + Math.random() * 1000;
}
export function getResults(searchText) {

    cancel && cancel();
    const request = agent.get(`/api/fournisseurs?societe=${searchText}&del=false&isactif=true&props[]=id&props[]=societe&props[]=firstName&props[]=lastName`, {
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_DATA,
                payload: response.data
            })

        }
        ).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('get canceled')
            }
        })
    }
  
}


export function setGlobalSearchText(event) {
    return {
        type: SF_SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function showSearch() {
    return {
        type: SF_OPEN,
    }
}

export function hideSearch() {
    return {
        type: SF_CLOSE,
    }
}


