// Imports
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

// UI Imports
import "@rmwc/theme/styles"
import "@rmwc/tabs/styles"
import "@rmwc/typography/styles"
import "@rmwc/card/styles"
import "@rmwc/menu/styles"
import "@rmwc/list/styles"
import "@rmwc/snackbar/styles"
import "@rmwc/switch/styles"
import "@rmwc/grid/styles"

// App Imports
import App from "./app"
import "./index.css"
import { store, persistedStore } from "./createStore"

// Render App
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
)
