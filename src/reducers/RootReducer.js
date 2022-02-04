import { combineReducers } from "redux";
// import authReducer from "./reducer";
import templateReducer from "./templateReducer";

export default combineReducers({
  //   auth: authReducer,
  templates: templateReducer,
});
