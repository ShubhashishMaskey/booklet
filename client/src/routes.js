import React from "react";
import { Route, Switch } from "react-router-dom";
import Authentication from "./components/UserAuthentication/Authentication";
import Books from "./components/Books";
import AddBooks from "./components/AddBooks";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";

export default localStorage.token ? (
  <Switch>
    <Route path="/" exact component={Books}></Route>
    <Route path="/books" exact component={Books}></Route>
    <Route path="/add-books" exact component={AddBooks}></Route>
    <Route path="/dashboard/clientId/:id" exact component={Dashboard}></Route>
    <Route path="*" component={Error}></Route>
  </Switch>
) : (
  <Switch>
    <Route path="/" exact component={Books}></Route>
    <Route path="/books" exact component={Books}></Route>
    <Route path="/auth/register" exact component={Authentication}></Route>
    <Route path="/auth/login" exact component={Authentication}></Route>
    <Route path="*" component={Error}></Route>
  </Switch>
);
