import React, { Component } from "react"
import PropTypes from "prop-types"

import { PluginsList } from "../../components"
import { connect } from "react-redux"

class Plugins extends Component {
  render() {
    return (
      <div>
        <PluginsList plugins={this.props.plugins.data} />
      </div>
    )
  }
}

Plugins.propTypes = {
  plugins: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  }
}

export default connect(mapStateToProps, {})(Plugins)
