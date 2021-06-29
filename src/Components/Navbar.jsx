import React from "react";
import StoreContext from '../store/StoreContext'
import {useObserver} from 'mobx-react'
import classes from "../ComponentsCSS/Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import GuardRoute from "./GuardRoute";
import Logout from "./Logout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Exchange from './Exchange'
import Chart from './Chart'


const Navbar = () => {
  const store = React.useContext(StoreContext)
  return useObserver(()=>(
    <Router>
      <div>
        <nav className={classes.nav}>
          <div className={classes.container}>
            <Link className={classes.item} to="/">
              Home
            </Link>
            <Link className={classes.item} to="/exchange">
              Exchange
            </Link>
            <Link className={classes.item} to="/chart">
              Chart
            </Link>
              {!store.isLoggedIn ? (<Link className={classes.item} to="/login">
              Login
            </Link>):(console.log())}
            {store.isLoggedIn ? (<Link className={classes.item} to="/logout">
              Logout
            </Link>):(console.log())}
          </div>
        </nav>
        <Switch>
          <GuardRoute path="/exchange" component={Exchange}>
            <Exchange />
          </GuardRoute>
          <GuardRoute path="/chart" component={Chart}>
            <Chart />
          </GuardRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  ));
};

export default Navbar;
