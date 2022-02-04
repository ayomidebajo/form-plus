import {
  GET_TEMPLATE_DATA,
  LOADED,
  LOADING,
  SERVER_ERROR,
  NETWORK_ERROR,
} from "../types/types";

const iniState = {
  data: null,
  loading: false,
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

    default:
      return state;
  }
}
