// Imports
import React, { Component } from "react"
// UI Imports
import { Tab, TabBar } from "@rmwc/tabs"
// App imports
import { Link } from "react-router-dom"

class NavBar extends Component {
  render() {
    return (
      <TabBar>
        <Tab label="Home" icon="home" tag={Link} to="/" />
        <Tab label="Plugins" icon="extension" tag={Link} to="/plugins" />
        <Tab label="Settings" icon="settings" tag={Link} to="/settings" />
      </TabBar>
    )
  }
}

export default NavBar
