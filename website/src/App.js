import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/auth/AuthContext'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <AuthContextProvider>
            <Switch>
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </AuthContextProvider>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
