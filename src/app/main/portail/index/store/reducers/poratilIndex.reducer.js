import * as Actions from "../actions";

const initialState = {
  data: [],
  loading: false,
  searchText: "",
  categories: [],
  news: [],
  produits: [],
  loadingNews: false,
  loadingCategories: false,
  loadingProduits: false,
};

const poratilIndexReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CLEAN_UP_CATEGORIES: {
      return {
        ...state,
        categories: [],
      };
    }
    case Actions.CLEAN_UP_DEVIS: {
      return {
        ...state,
        data: [],
      };
    }
    case Actions.CLEAN_UP_PRODUCT: {
      return {
        ...state,
        produits: [],
      };
    }
    case Actions.CLEAN_UP_NEW: {
      return {
        ...state,
        news: [],
      };
    }
    case Actions.REQUEST_CATEGORIES: {
      return {
        ...state,
        loadingCategories: true,
      };
    }
    case Actions.REQUEST_DEMANDE_DEVIS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.REQUEST_FOCUS_PRODUITS: {
      return {
        ...state,
        loadingProduits: true,
      };
    }

    case Actions.GET_CATEGORIES: {
      return {
        ...state,
        loadingCategories: false,
        categories: action.payload,
      };
    }
    case Actions.GET_FOCUS_PRODUITS: {
      return {
        ...state,
        loadingProduits: false,
        produits: action.payload,
      };
    }
    case Actions.REQUEST_ACTUALITE: {
      return {
        ...state,
        loadingNews: true,
      };
    }
    case Actions.GET_ACTUALITE: {
      return {
        ...state,
        news: action.payload,
        loadingNews: false,
      };
    }
    case Actions.GET_DEMANDE_DEVIS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default poratilIndexReducer;
