import * as Actions from "../actions";

const initialState = {
  data: null,
  loading: false,
};

const widget12Reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.REQUEST_WIDGET12:
      return {
        ...state,
        loading: true,
      };
    case Actions.GET_WIDGET12:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Actions.CLEAN_UP_WIDGET12:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default widget12Reducer;
