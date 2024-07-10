import agent from "agent";

export const CLEAN_UP = '[FAQS PORTAIL APP] CLEAN_UP';
export const REQUEST_FAQS = '[FAQS PORTAIL APP] REQUEST_FAQS';
export const GET_FAQS = '[FAQS PORTAIL APP] GET_FAQS';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getFaqs() {
    const request = agent.get(`/api/faq_categories`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FAQS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_FAQS,
                payload: response.data
            })

        }

        );
    }

}

