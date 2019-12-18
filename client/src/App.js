import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import routes from "./routes";
import axios from "axios";

axios.defaults.baseURL = "https://booklet-app.herokuapp.com";

const theme = createMuiTheme({
  palette: {
    primary: indigo
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Montserrat", "sans-serif"].join(",")
  }
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <div style={{ paddingTop: "80px", paddingBottom: "60px" }}>
              {routes}
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
