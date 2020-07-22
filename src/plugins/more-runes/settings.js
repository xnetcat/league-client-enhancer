// Imports
import React from "react"

// Ui Imports
import { TextField } from "@rmwc/textfield"

export class AutoSaveRunesSettings extends React.Component {
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

export default AutoSaveRunesSettings
