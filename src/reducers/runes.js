import { RUNES_CURRENT_SET } from "../actions/runes"

const initialState = {
  data: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RUNES_CURRENT_SET:
      return {
        data: action.data,
      }

    default:
      return state
  }
}
