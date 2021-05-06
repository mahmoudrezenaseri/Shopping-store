import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/auth/AuthContext'
import './App.css'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Layout = React.lazy(() => import('./containers/Layout'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <AuthContextProvider>
            <Switch>
              <Route path="/" name="Home" render={props => <Layout {...props} />} />
            </Switch>
          </AuthContextProvider>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
