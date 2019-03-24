
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux"
import configureStore from './store/configureStore';
import { firebase } from "./firebase/firebase";
import history from './history/history';
import './../styles/styles.scss';
import { login, logout } from './actions/auth';
import { setSavedTeams } from './actions/pokeTeam';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<p> Loading...</p>, document.getElementById('app'));

let isRendered = false;

const renderApp = () => {
	if (!isRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		isRendered = true;
	}
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {    
    store.dispatch(login(user.uid));
    store.dispatch(setSavedTeams()).then(() => { 
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/create');
      }
    });
  } else {
    renderApp();
    store.dispatch(logout());
    history.push('/');
  }
});
