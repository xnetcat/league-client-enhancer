import isEmpty from "lodash/isEmpty";
import { DATA_CURRENT_SET } from "../actions/lcu-data";

const initialState = {
  isConnected: false,
  data: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DATA_CURRENT_SET:
      return {
        isConnected: !isEmpty(action.data),
        data: action.data,
      };

    default:
      return state;
  }
};
