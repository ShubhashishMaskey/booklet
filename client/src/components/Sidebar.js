import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Logout } from "../services";
import "../assets/css/sidebar.css";

export default withRouter(
  class Sidebar extends Component {
    render() {
      const path = this.props.location.pathname;
      const { clientId } = this.props;
      const commonLink = (
        <>
          <li>
            <a
              href="/"
              className={`menu-item ${
                path === "/" ? "MuiButton-containedPrimary text-light" : ""
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/books"
              className={`menu-item ${
                path === "/books" ? "MuiButton-containedPrimary text-light" : ""
              }`}
            >
              Books
            </a>
          </li>
        </>
      );

      return (
        <nav className={this.props.className}>
          <div className="p-1 close-toggle" onClick={this.props.toggle}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </div>
          {!localStorage.token ? (
            <ul>
              {commonLink}
              <li>
                <a
                  href="/auth/register"
                  className={`menu-item ${
                    path === "/auth/register"
                      ? "MuiButton-containedPrimary text-light"
                      : ""
                  }`}
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className={`menu-item ${
                    path === "/auth/login"
                      ? "MuiButton-containedPrimary text-light"
                      : ""
                  }`}
                >
                  Login
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              {commonLink}
              <li>
                <a
                  href={`/dashboard/clientId/${clientId}`}
                  className={`menu-item ${
                    path === `/dashboard/clientId/${clientId}`
                      ? "MuiButton-containedPrimary text-light"
                      : ""
                  }`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <span
                  onClick={() => Logout()}
                  style={{ color: "#dc3545" }}
                  className="menu-item"
                >
                  <i className="fa fa-sign-out-alt"></i> &nbsp;Logout
                </span>
              </li>
            </ul>
          )}
        </nav>
      );
    }
  }
);
