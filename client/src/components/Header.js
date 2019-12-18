import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Logout } from "../services";
import Sidebar from "./Sidebar";
import axios from "axios";
import "../assets/css/header.css";

export default withRouter(
  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {},
        isOpen: false
      };
    }
    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
      if (localStorage.token) {
        axios
          .get(`/api/user`, {
            headers: {
              "auth-token": localStorage.token
            }
          })
          .then(res => this.setState({ user: res.data }));
      }
    }

    UNSAFE_componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = node => {
      this.wrapperRef = node;
    };

    handleClickOutside = event => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({
          isOpen: false
        });
      }
    };
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };
    render() {
      const { isOpen, user } = this.state;
      const path = this.props.location.pathname;
      const auth = localStorage.token;
      return (
        <div>
          <Navbar dark fixed="top" expand="md">
            <NavbarBrand href="/">Booklet</NavbarBrand>
            <IconButton
              onClick={this.toggle}
              className={`trigger-button ${isOpen ? "bar-active" : ""}`}
            >
              <MenuIcon />
            </IconButton>
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/books">
                    <Button
                      color={path === "/books" ? "primary" : "inherit"}
                      variant={path === "/books" ? "contained" : "text"}
                    >
                      Books
                    </Button>
                  </NavLink>
                </NavItem>
                {auth ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="text-capitalize">
                      {auth && (
                        <Button color="inherit">
                          <AccountCircle /> {user.firstname}
                        </Button>
                      )}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem divider />
                      <DropdownItem href={`/dashboard/clientId/${user._id}`}>
                        <i className="fa fa-user-circle"></i>&nbsp; Dashboard
                      </DropdownItem>
                      <DropdownItem>
                        <i className="fa fa-user-edit"></i> Edit Profile
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={() => Logout()}
                        className="danger-text"
                      >
                        <i className="fa fa-sign-out-alt"></i> &nbsp;Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <>
                    <NavItem>
                      <NavLink href="/auth/register">
                        <Button
                          color={
                            path === "/auth/register" ? "primary" : "inherit"
                          }
                          variant={
                            path === "/auth/register" ? "contained" : "text"
                          }
                        >
                          Register
                        </Button>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/auth/login">
                        <Button
                          color={path === "/auth/login" ? "primary" : "inherit"}
                          variant={
                            path === "/auth/login" ? "contained" : "text"
                          }
                        >
                          Login
                        </Button>
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </Collapse>
          </Navbar>
          <div className="sidebar" ref={this.setWrapperRef}>
            <Sidebar
              className={`sidebar-nav ${!isOpen ? "active" : ""} `}
              toggle={this.toggle}
              clientId={user._id}
            />
          </div>
        </div>
      );
    }
  }
);
