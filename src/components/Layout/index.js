// Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// UI Imports
import { Typography } from "@rmwc/typography";
// App imports
import { dataRemove, setCurrentData } from "../../actions/lcu-data";
import { NavBar } from "../.";

class Layout extends Component {
  componentDidMount() {
    const ipcRenderer = window.require("electron").ipcRenderer;

    ipcRenderer.on("lcu-load", (event, data) => {
      this.props.setCurrentData(data);
    });

    ipcRenderer.on("lcu-unload", () => {
      this.props.dataRemove();
    });
  }

  render() {
    const { isConnected } = this.props.lcuData;

    if (isConnected) {
      return (
        <>
          <NavBar />
          {this.props.children}
        </>
      );
    } else {
      return (
        <Typography
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          use="headline6"
        >
          Please start League of Legends client
        </Typography>
      );
    }
  }
}

Layout.propTypes = {
  lcuData: PropTypes.object.isRequired,
  setCurrentData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    lcuData: state.lcuData,
  };
}

export default connect(mapStateToProps, { setCurrentData, dataRemove })(Layout);
