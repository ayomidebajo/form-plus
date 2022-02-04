import {
  GET_TEMPLATE_DATA,
  LOADED,
  LOADING,
  SERVER_ERROR,
  NETWORK_ERROR,
} from "../types/types";
import axios from "axios";

export const getTemplateData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await axios(
        `https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
      );

      console.log(res, "results");
      dispatch({
        type: LOADED,
      });
      dispatch({
        type: GET_TEMPLATE_DATA,
        payload: res.data,
      });
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: SERVER_ERROR,
          payload: "An error occured",
        });
      }
      if (error.response.status === 401) {
        dispatch({
          type: NETWORK_ERROR,
          payload: "Invalid credentials",
        });

        if (error.response.status === 403) {
          dispatch({
            type: NETWORK_ERROR,
            payload: "Forbidden request",
          });
        }
      }
    }
  };
};
