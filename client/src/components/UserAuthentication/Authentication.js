import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Paper, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Register from "./Register";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  }
});

export default withStyles(styles)(
  class Authentication extends Component {
    render() {
      const { classes } = this.props;
      const path = this.props.location.pathname;
      return (
        <>
          <main className={classes.main}>
            <Helmet>
              {path === "/auth/register" && <title>Register | Booklet</title>}
              {path === "/auth/login" && <title>Login | Booklet</title>}
            </Helmet>
            <CssBaseline />
            <Paper elevation={6} className={classes.paper}>
              {path === "/auth/login" && <Login />}
              {path === "/auth/register" && <Register />}
            </Paper>
          </main>
        </>
      );
    }
  }
);
