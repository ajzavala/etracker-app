import React from 'react';
import ReactDOM from 'react-dom';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './Components/Home';
import Login from './Components/Login';
import Main from './Components/Main';
import Registration from './Components/Registration';
import history from './history';
import Expenses from './Components/Expenses';
import ExpenseCategories from './Components/ExpenseCategories';


const routing = (
  <Router history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/main" component={Main} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/categories" component={ExpenseCategories} />

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
