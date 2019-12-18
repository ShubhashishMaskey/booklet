import React, { Component } from "react";
import { Button, CssBaseline } from "@material-ui/core";
import "../assets/css/error.css";

export default class Error extends Component {
  render() {
    return (
      <div className="booklet__error-container">
        <CssBaseline />
        <h1>Error 404</h1>
        <h3>Page Not Found</h3>
        <div>
          <Button variant="contained" href="/">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
}
