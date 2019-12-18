import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Paper, CssBaseline } from "@material-ui/core";
import { Icon } from "antd";
import axios from "axios";
import propic from "../assets/img/user_profile.png";
import moment from "moment";
import "../assets/css/dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      bookList: [],
      isFetching: true
    };
  }
  componentDidMount() {
    axios
      .get(`/api/user`, {
        headers: {
          "auth-token": localStorage.token
        }
      })
      .then(res => {
        setTimeout(() => {
          this.setState({ user: res.data, isFetching: false });
        }, 2500);
      });
    axios
      .get(`/api/book`)
      .then(res => this.setState({ bookList: res.data.books }));
  }
  render() {
    const { user, bookList, isFetching } = this.state;
    return (
      <div className="container-fluid booklet__dashboard-container">
        <Helmet>
          <title>{`Dashboard - ${user.firstname}.${user.lastname} | Booklet`}</title>
        </Helmet>
        <CssBaseline />
        {isFetching ? (
          <div className="text-center">
            <Icon type="sync" spin />
          </div>
        ) : (
          <div className="row">
            {user && !isFetching && (
              <div className="col-md-6 offset-md-3 mb-3" key={user._id}>
                <Paper elevation={4}>
                  <div className="card">
                    <div className="row no-gutters">
                      <div className="col-md-12 card-header m-0">
                        <h3 className="text-center m-0">Personal Details</h3>
                      </div>
                      <div className="col-md-5 booklet__dashboard-propic">
                        <img src={propic} alt="user-pic" />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <h5 className="card-title user__book-name">
                            Firstname :{" "}
                            <span className="font-weight-bold text-uppercase">
                              {user.firstname}
                            </span>
                          </h5>
                          <h5 className="card-title user__book-name">
                            Lastname :{" "}
                            <span className="font-weight-bold text-uppercase">
                              {user.lastname}
                            </span>
                          </h5>
                          <h5 className="card-title user__book-name">
                            Username:{" "}
                            <span className="font-weight-bold">
                              {user.username}
                            </span>
                          </h5>
                          <h5 className="card-title user__book-name">
                            Phone :{" "}
                            <span className="font-weight-bold text-uppercase">
                              {user.phone}
                            </span>
                          </h5>
                          <h5 className="card-title user__book-name">
                            Address :{" "}
                            <span className="font-weight-bold text-uppercase">
                              {user.address}, {user.postalCode}
                            </span>
                          </h5>
                          <p className="card-text text-dark user__book-borrowed">
                            No. of Books Borrowed :{" "}
                            <span className="font-weight-bold">
                              {user.borrowedBook.length}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            )}
            {user.borrowedBook.length !== 0 && (
              <div className="col-md-10 offset-md-1">
                <div className="card text-white bg-secondary">
                  <div className="row no-gutters">
                    <div className="col-md-12 card-header m-0">
                      <h3 className="text-center m-0 text-white">Books you borrowed</h3>
                    </div>
                    {user.borrowedBook.map(borrow =>
                      bookList
                        .filter(bookId => bookId._id === borrow)
                        .map((book, index) => {
                          return (
                            <div className="col-md-6 p-2" key={index}>
                              <Paper elevation={6}>
                                <div className="card">
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
                                    </div>
                                  </div>
                                </div>
                              </Paper>
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
