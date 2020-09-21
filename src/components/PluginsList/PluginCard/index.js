// Imports
import React, { Component } from "react"

// Ui Imports
import { Card } from "@rmwc/card"
import { ListDivider } from "@rmwc/list"

// App Imports
import PluginActions from "../PluginActions"
import PluginPrimaryActions from "../PluginPrimaryActions"

class PluginCard extends Component {
    render() {
        return (
            <>
                <br />
                <br />
                <Card style={{ width: "80%", margin: "0 auto" }}>
                    <PluginPrimaryActions
                        style={{ margin: 0 }}
                        plugin={this.props.plugin}
                    />
                    <ListDivider />
                    <PluginActions
                        style={{ margin: 0 }}
                        url={this.props.plugin.url}
                        name={this.props.plugin.name}
                        enabled={this.props.plugin.enabled}
                        id={this.props.index}
                    />
                </Card>
                <br />
            </>
        )
    }
}

export default PluginCard
