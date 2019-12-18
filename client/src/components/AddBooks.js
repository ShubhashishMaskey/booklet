import React, { Component } from "react";
import { Paper, CssBaseline, Button } from "@material-ui/core";
import { Form, Icon, Input } from "antd";
import axios from "axios";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";

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
  class AddBooks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bookName: "",
        author: "",
        isbn: "",
        description: "",
        publishedDate: null,
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
      const { bookName, author, isbn, description, publishedDate } = this.state;
      const data = {
        bookName: bookName,
        author: author,
        isbn: isbn,
        description: description,
        publishedDate: publishedDate
      };
      axios
        .post(`/api/book`, data)
        .then(res => {
          setTimeout(() => {
            return this.setState({
              isFetching: false,
              message: res.data.message,
              color: "alert-success"
            });
          }, 2000);
          console.log(res);
        })
        .catch(err => {
          setTimeout(() => {
            return this.setState({
              isFetching: false,
              // message: err.response.data.message,
              color: "alert-danger"
            });
          }, 2000);
          console.log(err.response);
        });
    };
    render() {
      const {
        bookName,
        author,
        isbn,
        description,
        publishedDate,
        message,
        color,
        isFetching
      } = this.state;

      const { classes } = this.props;
      return (
        <main className={classes.main}>
          <Helmet>
            <title>Add New Books | Booklet</title>
          </Helmet>
          <CssBaseline />
          <Paper elevation={6} className={classes.paper}>
            <div className="booklet__add-book-container w-100">
              <div className="text-center mb-3">
                <h2 className="m-0">Add Book</h2>
                <span>add new book here</span>
                {message !== "" && (
                  <div className={`alert my-2 ${color}`}>{message}</div>
                )}
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="book" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Book Name *"
                    type="text"
                    name="bookName"
                    size="large"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="author *"
                    type="text"
                    name="author"
                    size="large"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="ISBN *"
                    type="text"
                    name="isbn"
                    size="large"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="Write a short description..... *"
                    type="textarea"
                    name="description"
                    size="large"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="Published Date of the book *"
                    type="date"
                    name="publishedDate"
                    size="large"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item className="mt-3">
                  <Button
                    type="submit"
                    color="secondary"
                    fullWidth
                    variant="contained"
                    disabled={
                      bookName === "" ||
                      author === "" ||
                      isbn === "" ||
                      description === "" ||
                      publishedDate === ""
                        ? true
                        : false
                    }
                  >
                    {isFetching ? <Icon type="sync" spin /> : "Add Book"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Paper>
        </main>
      );
    }
  }
);
