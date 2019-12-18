import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      isFetching: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isFetching: true
    });
    const { username, password } = this.state;
    const data = {
      username: username,
      password: password
    };
    axios
      .post(`/api/login`, data)
      .then(res => {
        setTimeout(() => {
          return this.setState({
            isFetching: false
          });
        }, 2000);
        localStorage.setItem("token", res.data.token);
        document.location = `/dashboard/clientId/${res.data.id}`;
      })
      .catch(err =>
        setTimeout(() => {
          return this.setState({
            isFetching: false,
            error: err.response.data
          });
        }, 2000)
      );
  };
  render() {
    const { username, password, error, isFetching } = this.state;

    return (
      <div className="booklet__login-container">
        <div className="text-center mb-3">
          <h2 className="m-0">Log In</h2>
          <span>use your account</span>
          {error !== "" && (
            <div className="alert alert-danger my-2">{error}</div>
          )}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username *"
              type="text"
              name="username"
              size="large"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password *"
              type="password"
              name="password"
              size="large"
              onChange={this.handleChange}
              visibilityToggle={true}
            />
          </Form.Item>
          <Form.Item className="mt-3">
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              disabled={username === "" || password === "" ? true : false}
            >
              {isFetching ? <Icon type="sync" spin /> : "Log In"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center my-3" style={{ fontSize: 18 }}>
          Don't have an account? <a href="/auth/register">Register here</a>
        </div>
      </div>
    );
  }
}
