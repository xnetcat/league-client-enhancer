import React from "react"

export default class AutoSaveRunesWindow extends React.Component {
  render() {
    setTimeout(() => {
      window.close()
    }, 2000)

    return <h1>TEST</h1>
  }
}
