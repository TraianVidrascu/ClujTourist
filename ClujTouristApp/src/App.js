import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'
<<<<<<< HEAD
import 'react-notifications/lib/notifications.css'
=======
>>>>>>> develop
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
<<<<<<< HEAD
import Add from './components/objectives/Add'
=======
import Add from './components/Add'
>>>>>>> develop
import Dashboard from './components/protected/Dashboard'
import Map from './components/Map'
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants'
<<<<<<< HEAD
import EditObjective from "./components/objectives/EditObjective";
import ObjectiveDP from "./components/ObjectiveDetailPage";
=======
>>>>>>> develop

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/map' />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Turism Cluj</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/map" className="navbar-brand">Map</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>

                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
<<<<<<< HEAD
                {/*<Route path='/' exact component={Home} />*/}
                <PropsRoute path='/' exact component={Home} authed={this.state.authed} />
=======
                <Route path='/' exact component={Home} />
>>>>>>> develop
                <PublicRoute authed={this.state.authed} path='/map' exact component={Map} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PublicRoute authed={this.state.authed} path='/add' component={Add} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
<<<<<<< HEAD
                <PrivateRoute authed={this.state.authed} path='/objectives/:id' component={EditObjective} />
                <PublicRoute authed={this.state.authed} path='/objective/:id' component={ObjectiveDP} />
=======
>>>>>>> develop
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
