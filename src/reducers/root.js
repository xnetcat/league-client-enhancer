// Imports
import { combineReducers } from "redux"

// App Imports
import lcuData from "./lcu-data"
import plugins from "./plugins"

export const rootReducer = combineReducers({
  lcuData,
  plugins,
})
