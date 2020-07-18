import React, { Component } from "react";
import {Typography} from '@rmwc/typography'

class Home extends Component {
  render() {
    const { app } = window.require('electron').remote
    return (
      <>
      <Typography tag='h1' style={{ textAlign: "center", marginTop: '10%' }}>League Client Enhancer</Typography>

      <footer style={{ bottom: 0, width: '100%', left: 0, position: 'fixed'}}>
        <Typography tag='h5' style={{float: "left", paddingLeft: '3%' }}>READY...</Typography> {/* Show real status: connected etc. */}
        <Typography tag='h5' style={{float: "right", paddingRight: '3%' }}>{`V${app.getVersion() + (!app.isPackaged ? '-BUILD' : '')}`}</Typography>
      </footer>
      </>
    )
  }
}

export default Home;
