import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      postalCode: "",
      username: "",
      password: "",
      message: "",
      color: "",
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
    const {
      firstname,
      lastname,
      phone,
      address,
      postalCode,
      username,
      password
    } = this.state;
    const data = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      address: address,
      postalCode: postalCode,
      username: username,
      password: password
    };
    axios
      .post(`/api/user`, data)
      .then(res => {
        setTimeout(() => {
          this.setState({
            isFetching: false,
            color: "alert-success",
            message: res.data.message
          });
          document.location = "/auth/login";
        }, 2500);
      })
      .catch(err => {
        setTimeout(() => {
          return this.setState({
            isFetching: false,
            color: "alert-danger",
            message: err.response.data.message
          });
        }, 2000);
      });
  };
  render() {
    const {
      firstname,
      lastname,
      username,
      password,
      phone,
      address,
      postalCode,
      message,
      color,
      isFetching
    } = this.state;

    return (
      <div className="booklet__register-container">
        <div className="text-center mb-3">
          <h2 className="m-0">Register</h2>
          <span>create an account</span>
          {message !== "" && (
            <div className={`alert my-2 ${color}`}>{message}</div>
          )}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              placeholder="Firstname"
              type="text"
              name="firstname"
              size="large"
              onChange={this.handleChange}
              value={firstname}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lastname"
              type="text"
              name="lastname"
              size="large"
              onChange={this.handleChange}
              value={lastname}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Phone/Mobile Number"
              type="number"
              name="phone"
              size="large"
              onChange={this.handleChange}
              value={phone}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Address"
              type="text"
              name="address"
              size="large"
              onChange={this.handleChange}
              value={address}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Postal Code"
              type="text"
              name="postalCode"
              size="large"
              onChange={this.handleChange}
              value={postalCode}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username *"
              type="text"
              name="username"
              size="large"
              onChange={this.handleChange}
              value={username}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password *"
              size="large"
              value={password}
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
              {isFetching ? <Icon type="sync" spin /> : "Register"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center my-3" style={{ fontSize: 18 }}>
          Already have an account? <a href="/auth/login">Login here</a>
        </div>
      </div>
    );
  }
}
