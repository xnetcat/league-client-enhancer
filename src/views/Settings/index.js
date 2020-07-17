import React, { Component } from "react";

class Settings extends Component {
  render() {
    return (
      <>
        <button onClick={(event) => {
          event.preventDefault()
          const ipcRenderer = window.require('electron').ipcRenderer

          ipcRenderer.send('win-hide');
		      ipcRenderer.send('tray', true);
        }} >HAAHAHAHAHAHAHAAHHAHA</button>
      </>
    )
  }
}

export default Settings;
