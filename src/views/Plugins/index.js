// Imports
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// App Imports
import { PluginsList } from "../../components"

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
