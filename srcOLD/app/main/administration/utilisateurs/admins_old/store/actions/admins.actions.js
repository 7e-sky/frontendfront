import agent from "agent";

export const GET_ADMINS = '[USERS APP] GET ADMINS';
export const SET_ADMINS_SEARCH_TEXT = '[USERS APP] SET ADMINS SEARCH TEXT';

export function getAdmins()
{
    const request = agent.get('/api/admins');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ADMINS,
                payload: response.data['hydra:member']
            })
        );
}

export function setAdminsSearchText(event)
{
    return {
        type      : SET_ADMINS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

