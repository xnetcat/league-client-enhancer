// Imports
import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Ui Imports
import { TextField } from "@rmwc/textfield"

class AutoSaveRunesSettings extends React.Component {
  changeConfig(event, pluginName, configName) {
    event.preventDefault()
    if (event.target.value.match(/^\d{3,4}$/)) {
      const ipcRenderer = window.require("electron").ipcRenderer

      ipcRenderer.send("plugins-config-change", {
        value: event.target.value,
        configName: configName,
        pluginName: pluginName,
      })
    }
  }

  render() {
    return (
      <>
        <TextField
          style={{ width: "30%", margin: "10% auto" }}
          outlined
          label="Interval"
          pattern="^\d{3,4}$"
          onChange={(event) => {
            this.changeConfig(
              event,
              this.props.match.path.split("/")[2],
              "interval"
            )
          }}
        />
      </>
    )
  }
}
AutoSaveRunesSettings.propTypes = {
  plugins: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  }
}

const connectedComponent = connect(mapStateToProps)(AutoSaveRunesSettings)

export { connectedComponent as AutoSaveRunesSettings }

export function doInBackground(config) {
  return setInterval(() => {
    console.log(2222)
  }, config.interval)
}

export default function pluginInfo() {
  return {
    name: "auto-save-runes",
    author: "kko7",
    enabled: false,
    config: {
      interval: 1000,
    },
    bg: doInBackground,
    shortDescription: "Automatically save runes every x seconds",
    longDescription: "As in title",
  }
}
