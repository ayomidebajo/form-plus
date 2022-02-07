import {
  GET_TEMPLATE_DATA,
  LOADED,
  LOADING,
  NETWORK_ERROR,
  SET_PAGE_NUMBER,
} from "../types/types";
import axios from "axios";

export const getTemplateData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await axios.get(
        `https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
      );

      dispatch({
        type: LOADED,
      });
      dispatch({
        type: GET_TEMPLATE_DATA,
        payload: res.data,
      });
      dispatch({
        type: SET_PAGE_NUMBER,
        payload: res.data.length,
      });
    } catch (error) {
      if (error) {
        dispatch({
          type: NETWORK_ERROR,
          payload: "An error occured",
        });
      }
    }
  };
};
