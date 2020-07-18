// Imports
import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Ui Imports
import { TextField } from "@rmwc/textfield"

class DodgeQueueSettings extends React.Component {
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
DodgeQueueSettings.propTypes = {
  plugins: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  }
}

const connectedComponent = connect(mapStateToProps)(DodgeQueueSettings)

export { connectedComponent as DodgeQueueSettings }

export function doInBackground(config) {
  const ipcRenderer = window.require("electron").ipcRenderer
  let inChampSelect = false

  ipcRenderer.on("lcu-api-data", (event, arg) => {
    if (arg.pluginName === "easy-queue-dodge") {
      if (arg.response.status === 404) {
        inChampSelect = false
      } else {
        if (!inChampSelect) {
          ipcRenderer.send("notification-request", {
            message: "You are in champion select, press button below to dodge",
            actions: [
              {
                label: "Dodge queue",
                toSend: [
                  {
                    channel: "lcu-api-request",
                    endpoint:
                      "/lol-login/v1/session/invoke?destination=gameService&method=quitGame",
                    method: "post",
                    data: {
                      args: "%5B%5D",
                    },
                    pluginName: "easy-queue-dodge",
                  },
                  {
                    channel: "lcu-api-request",
                    endpoint: "/lol-lobby/v2/lobby",
                    method: "delete",
                    data: {},
                    pluginName: "easy-queue-dodge",
                  },
                ],
              },
            ],
          })
        }
        inChampSelect = true
      }
    }
  })
  return setInterval(() => {
    ipcRenderer.send("lcu-api-request", {
      pluginName: "easy-queue-dodge",
      endpoint: "/lol-champ-select/v1/session",
      method: "get",
      data: {},
    })
  }, config.interval)
}

export default function pluginInfo() {
  return {
    name: "easy-queue-dodge",
    author: "kko7",
    enabled: false,
    config: {
      interval: 1000,
    },
    bg: doInBackground,
    shortDescription: "Dodge without closing the entire client.",
    longDescription: "As in title",
  }
}
