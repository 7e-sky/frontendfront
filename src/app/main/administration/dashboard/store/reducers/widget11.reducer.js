import * as Actions from "../actions";

const initialState = {
  data: null,
  loading: false,
  total: 0,
};

const widget11Reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.REQUEST_WIDGET11:
      return {
        ...state,
        loading: true,
      };
    case Actions.GET_WIDGET11:
      return {
        ...state,
        loading: false,
        data: action.payload["hydra:member"],
        total: action.payload["hydra:totalItems"],
      };
    case Actions.CLEAN_UP_WIDGET11:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default widget11Reducer;
