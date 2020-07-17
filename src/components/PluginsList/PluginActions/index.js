// Imports
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

// Ui imports
import {CardActionButton, CardActionButtons, CardActionIcon, CardActionIcons, CardActions,} from "@rmwc/card";

// App imports
import {setCurrentPlugins} from "../../../actions/plugins";

class PluginActions extends React.Component {
  openGitHub(event, name) {
    event.preventDefault()
    const shell = window.require('electron').remote.shell
    shell.openExternal(`https://github.com/kko7/league-client-enhancer/issues/new?labels=bug&title=${name} bug`)
  }

  disablePlugin(event, id) {
    event.preventDefault()
    let newArray = [...this.props.plugins.data]
    newArray[id] = {...newArray[id], enabled: !newArray[id].enabled}
    this.props.setCurrentPlugins(newArray)
  }

  createWindow (event, name) {
    const isDev = window.require('electron-is-dev')
    event.preventDefault()
    window.open(isDev
      ? `http://localhost:3000/#/plugin/${name}`
      : `#/plugin/${name}`)
  }

  render () {
    return (
        <CardActions>
          <CardActionButtons>
            <CardActionButton onClick={(event) => this.disablePlugin(event, this.props.id)}>
              {this.props.enabled ? 'Disable': 'Enable'}
            </CardActionButton>
            <CardActionButton onClick={(event) => this.createWindow(event, this.props.name)}>
              Settings
            </CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon onClick={(event) => this.openGitHub(event, this.props.name)} icon="announcement" />
          </CardActionIcons>
        </CardActions>
    );
  }
}

PluginActions.propTypes = {
  plugins: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  };
}


export default connect(mapStateToProps, { setCurrentPlugins })(PluginActions);
