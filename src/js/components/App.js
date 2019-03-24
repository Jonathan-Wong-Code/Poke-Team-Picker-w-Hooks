import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import CreateTeamPage from './CreateTeamPage';
import SavedTeamsPage from './SavedTeamsPage';
import EditTeamPage from './EditTeamPage';
import LoginPage from './LoginPage';
import PrivateRoute from './../routes/PrivateRoute';
import PublicRoute from './../routes/PublicRoute';

const history = createHistory();

const App = () => {
  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <PublicRoute 
            path='/' 
            component={LoginPage} 
            exact
          />

          <PrivateRoute 
            path='/create' 
            component={CreateTeamPage} 
          />
          <PrivateRoute
            path='/SavedTeams' 
            component={SavedTeamsPage} 
          />
          <PrivateRoute 
            path='/edit/:id' 
            component={EditTeamPage} 
          />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
