
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
import agent from 'agent';

export const GET_ADMIN = '[USERS APP] GET ADMIN';
export const SAVE_ADMIN = '[USERS APP] SAVE ADMIN';
export const SAVE_ERROR = '[VILLES APP] SAVE ERROR';

export function getAdmin(params)
{
    const request = agent.get(`/api/admins/${params}`);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ADMIN,
                payload: response.data
            })
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
}

export function saveAdmin(data)
{
    const request = agent.post('/api/admins', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Admin Saved'}));

                return dispatch({
                    type   : SAVE_ADMIN,
                    payload: response.data
                })
            }
        );
}

export function newAdmin()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
        extraShippingFee: 0,
        active          : true
    };

    return {
        type   : GET_ADMIN,
        payload: data
    }
}
