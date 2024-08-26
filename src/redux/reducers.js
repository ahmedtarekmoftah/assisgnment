import { combineReducers } from "redux";

const infoPopupReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOW_INFO_POPUP":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  infoPopupData: infoPopupReducer,
});
