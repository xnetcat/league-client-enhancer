import React from "react";

import PluginCard from "./PluginCard";

class PluginsList extends React.Component {
  render() {
    return (
        <>
          {this.props.plugins.map((plugin, index) => {
            return (
                <PluginCard plugin={plugin} key={index} index={index} />
            )
          })}
        </>
    )
  }
}

export default PluginsList;
