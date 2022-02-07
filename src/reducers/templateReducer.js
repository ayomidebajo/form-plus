import {
  GET_TEMPLATE_DATA,
  LOADED,
  LOADING,
  SERVER_ERROR,
  NETWORK_ERROR,
  SET_PAGE_NUMBER,
} from "../types/types";

const iniState = {
  data: null,
  loading: false,
  pageTotal: 1,
  getTotalTemplates: 0,
  error: {},
  redirectTo: "",
  userTransfer: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = iniState, action) {
  switch (action.type) {
    case GET_TEMPLATE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: false,
      };
    case LOADED:
      return {
        ...state,
        loading: true,
      };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageTotal: action.payload / 60,
        getTotalTemplates: action.payload,
      };

    default:
      return state;
  }
}
