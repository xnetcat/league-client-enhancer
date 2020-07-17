import React from "react";
import { Virtuoso } from 'react-virtuoso'

import PluginCard from "./PluginCard";

class PluginsList extends React.Component {
  render() {
    return (
        <>
          <Virtuoso 
            totalCount={this.props.plugins.length}
            overscan={400} // {not sure about that}
            item={index => (
              <PluginCard plugin={this.props.plugins[index]} key={index} index={index} />
            )} />
        </>
    )
  }
}

export default PluginsList;
