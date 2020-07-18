// Imports
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Ui Imports
import { Snackbar, SnackbarAction } from "@rmwc/snackbar"

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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.plugins.data !== this.props.plugins.data) {
      return true
    }

    if (nextProps.lcuData !== this.props.lcuData) {
      return true
    }

    return nextState.snackbarOpen !== this.state.snackbarOpen
  }

  componentDidMount() {
    this.setPlugins()
    this.listenForNotifications()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setPlugins()
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
        this.state.backgroundJobs.push({ id: plugin.bg(), name: plugin.name })
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

  render() {
    const ipcRenderer = window.require("electron").ipcRenderer
    return (
      <>
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
                  this.setState({ snackbarOpen: false })
                  for (const object of action.toSend) {
                    ipcRenderer.send(object.channel, {
                      lcuData: object.lcuData,
                      endpoint: object.endpoint,
                      method: object.method,
                      data: object.data,
                      pluginName: object.pluginName,
                    })
                  }
                }}
              />
            )
          })}
          leading
          timeout={-1}
        />
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

export default connect(mapStateToProps, {})(Service)
