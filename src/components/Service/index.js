// Imports
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Ui Imports
import { Snackbar, SnackbarAction } from "@rmwc/snackbar"

// App Imports
import { setCurrentPlugins } from "../../actions/plugins"

class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false,
      snackbarMessage: "",
      snackbarActions: [],
      activePlugins: [],
      backgroundJobs: [],
    }
  }

  componentDidMount() {
    this.setPlugins()
    this.listenForNotifications()
    this.listenForConfigChange()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.plugins.data !== this.props.plugins.data ||
      prevProps.lcuData !== this.props.lcuData ||
      prevState.snackbarOpen !== this.state.snackbarOpen
    ) {
      this.setPlugins()
    }
  }

  setPlugins() {
    const activePlugins = this.props.plugins.data.filter(
      (plugin) => plugin.enabled
    )
    this.setState({ activePlugins }, function () {
      this.disablePlugins()
      this.startPlugins()
    })
  }

  disablePlugins() {
    for (const plugin of this.props.plugins.data.filter(
      (plugin) => !plugin.enabled
    )) {
      for (const job of this.state.backgroundJobs) {
        if (plugin.name === job.name) {
          clearInterval(job.id)
          const index = this.state.backgroundJobs.indexOf(job)

          if (index > -1) {
            this.state.backgroundJobs.splice(index, 1)
          }
        }
      }
    }
  }

  startPlugins() {
    for (const plugin of this.state.activePlugins) {
      const duplicate = this.state.backgroundJobs.find(
        (job) => job.name === plugin.name
      )
      if (!duplicate) {
        this.state.backgroundJobs.push({
          id: plugin.bg(plugin.config),
          name: plugin.name,
        })
      }
    }
  }

  listenForNotifications() {
    const ipcRenderer = window.require("electron").ipcRenderer

    ipcRenderer.on("notification-data", (event, data) => {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: data.message,
        snackbarActions: data.actions,
      })
    })
  }

  listenForConfigChange() {
    const ipcRenderer = window.require("electron").ipcRenderer
    ipcRenderer.on("config-data", (event, data) => {
      const newArray = [...this.props.plugins.data]

      const pluginIndex = this.props.plugins.data.indexOf(
        this.props.plugins.data.find((plugin) => {
          return plugin.name === data.pluginName
        })
      )

      if (pluginIndex > -1) {
        for (const job of this.state.backgroundJobs) {
          if (data.pluginName === job.name) {
            clearInterval(job.id)
            const index = this.state.backgroundJobs.indexOf(job)

            if (index > -1) {
              this.state.backgroundJobs.splice(index, 1)
            }
          }
        }

        const config = { ...newArray[pluginIndex].config }
        config[data.configName] = data.value
        newArray[pluginIndex] = { ...newArray[pluginIndex], config: config }
        this.props.setCurrentPlugins(newArray)
      }
    })
  }

  render() {
    const ipcRenderer = window.require("electron").ipcRenderer
    return (
      <>
        {this.state.snackbarOpen && (
          <Snackbar
            open={this.state.snackbarOpen}
            onClose={() => this.setState({ snackbarOpen: false })}
            message={this.state.snackbarMessage}
            stacked
            dismissesOnAction
            action={this.state.snackbarActions.map((action) => {
              return (
                <SnackbarAction
                  label={action.label}
                  onClick={(event) => {
                    event.preventDefault()
                    this.setState({ snackbarOpen: false }, () => {
                      for (const object of action.toSend) {
                        ipcRenderer.send(object.channel, {
                          lcuData: object.lcuData,
                          endpoint: object.endpoint,
                          method: object.method,
                          data: object.data,
                          pluginName: object.pluginName,
                        })
                      }
                    })
                  }}
                />
              )
            })}
            leading
            timeout={-1}
          />
        )}
        {this.props.children}
      </>
    )
  }
}

Service.propTypes = {
  lcuData: PropTypes.object.isRequired,
  plugins: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    lcuData: state.lcuData,
    plugins: state.plugins,
  }
}

export default connect(mapStateToProps, { setCurrentPlugins })(Service)
