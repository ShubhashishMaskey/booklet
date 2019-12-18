import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Paper, CssBaseline, Button } from "@material-ui/core";
import { Icon } from "antd";
import axios from "axios";
import moment from "moment";
import "../assets/css/books.css";

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      user_id: null,
      message: "",
      isFetching: true
    };
  }
  componentDidMount() {
    if (localStorage.token) {
      axios
        .get(`/api/user`, {
          headers: {
            "auth-token": localStorage.token
          }
        })
        .then(res => {
          this.setState({
            user_id: res.data._id
          });
        });
    }
    axios.get(`/api/book`).then(res => {
      setTimeout(() => {
        this.setState({ books: res.data.books, isFetching: false });
      }, 2500);
    });
  }
  handleBorrow = (bookID, userID) => {
    axios.post(`/api/book_borrow/${bookID}/${userID}`).then(res => {
      this.setState({ message: res.data.message });
      setTimeout(() => {
        this.setState({ isFetching: false });
        document.location = `/dashboard/clientID/${this.state.user_id}`;
      }, 2500);
    });
  };
  render() {
    const { books, user_id, message, isFetching } = this.state;
    return (
      <div className="container-fluid booklet__books-container">
        <Helmet>
          <title>Book's List | Booklet</title>
        </Helmet>
        <CssBaseline />
        {message !== "" && (
          <div>
            <div
              className="alert alert-success my-2 text-center w-50"
              style={{ margin: "0 auto" }}
            >
              {message} Redirecting to dashboard....
            </div>
          </div>
        )}
        {isFetching ? (
          <div className="text-center">
            <Icon type="sync" spin />
          </div>
        ) : (
          <div className="row">
            {books &&
              books.length !== 0 &&
              !isFetching &&
              books.map((book, index) => {
                return (
                  <div className="col-md-6 mb-3" key={index}>
                    <Paper elevation={4}>
                      <div className="card text-white bg-secondary">
                        <div className="row no-gutters">
                          <div className="col-md-12">
                            <div className="card-body">
                              <h5 className="card-title text-uppercase books__book-name mb-1">
                                {book.bookName}{" "}
                              </h5>
                              <p className="m-0">
                                by{" "}
                                <span className="text-capitalize text-dark font-weight-bold">
                                  {book.author}
                                </span>
                              </p>
                              <p className="m-0">
                                published :{" "}
                                {moment(book.publishedDate).format(
                                  "Do MMM, YYYY"
                                )}
                              </p>
                              <p
                                className="books__book-description my-2"
                                style={{ fontSize: 17 }}
                              >
                                {book.description}
                              </p>
                              <p className="card-text">
                                <small>
                                  Posted on{" "}
                                  {moment(book.createdDate).format(
                                    "Do MMM, YYY"
                                  )}
                                </small>
                              </p>
                            </div>
                            {localStorage.token && (
                              <div className="card-footer clearfix">
                                <Button
                                  onClick={() =>
                                    this.handleBorrow(book._id, user_id)
                                  }
                                  variant="contained"
                                  className="float-right"
                                >
                                  Borrow this book
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Paper>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}
