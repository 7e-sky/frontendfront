import agent from "agent";
import axios from "axios";

export const GS_SET_SEARCH_TEXT = '[GLOBAL SEARCH APP] GS_SET_SEARCH_TEXT';
export const REQUEST_DATA = '[GLOBAL SEARCH APP] REQUEST_DATA';
export const GET_DATA = '[GLOBAL SEARCH APP] GET_DATA';
export const GS_REQUEST_PRODUITS = '[GLOBAL SEARCH APP] GS_REQUEST_PRODUITS';
export const GS_REQUEST_ACTIVITES = '[GLOBAL SEARCH APP] GS_REQUEST_ACTIVITES';
export const GS_REQUEST_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_REQUEST_FOURNISSEUR';
export const GS_GET_PRODUITS = '[GLOBAL SEARCH APP] GS_GET_PRODUITS';
export const GS_GET_ACTIVITES = '[GLOBAL SEARCH APP] GS_GET_ACTIVITES';
export const GS_GET_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_GET_FOURNISSEUR';
export const GS_OPEN = '[GLOBAL SEARCH APP] GS_OPEN';
export const GS_CLOSE = '[GLOBAL SEARCH APP] GS_CLOSE';
export const CLEAN_UP = '[GLOBAL SEARCH APP] CLEAN_UP';
export const NO_SUGGESTIONS = '[GLOBAL SEARCH APP] NO_SUGGESTIONS';

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
        timeOut = setTimeout(() => {
            dispatch(getResults(value));
        }, randomDelay());
    };
}
function randomDelay() {
    return 300 + Math.random() * 1000;
}
export function getResults(searchText) {

    cancel && cancel();
    const request = agent.get(`/api/searchResult?searchText=${searchText}`, {
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
    /* const request = agent.get(`/api/produits?itemsPerPage=5&titre=${searchText}&isValid=true&props[]=titre&props[]=description&props[]=pu&props[]=currency&props[]=secteur&props[]=sousSecteurs&props[]=categorie&props[]=id&props[]=slug`);
     const request2 = agent.get(`/api/sous_secteurs?name=${searchText}&itemsPerPage=5&props[]=name&props[]=secteur&props[]=slug`);
     const request3 = agent.get(`/api/fournisseurs?itemsPerPage=5&isactif=true&societe=${searchText}&props[]=id&props[]=societe&props[]=slug`);
     return (dispatch) => {
         
         axios.all([request, request2, request3]).then(axios.spread((...responses) => {
             if(responses[0].data['hydra:member'].length === 0 && responses[1].data['hydra:member'].length===0 && responses[2].data['hydra:member'].length===0 ){
                 dispatch({
                     type: NO_SUGGESTIONS,
                 })
             }
             dispatch({
                 type: GS_GET_PRODUITS,
                 payload: responses[0].data['hydra:member']
             })
             dispatch({
                 type: GS_GET_ACTIVITES,
                 payload: responses[1].data['hydra:member']
             })
             dispatch({
                 type: GS_GET_FOURNISSEUR,
                 payload: responses[2].data['hydra:member']
             })
             // use/access the results 
         })).catch(errors => {
             // react on errors.
         })
     }
 */
}


export function setGlobalSearchText(event) {
    return {
        type: GS_SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function showSearch() {
    return {
        type: GS_OPEN,
    }
}

export function hideSearch() {
    return {
        type: GS_CLOSE,
    }
}


