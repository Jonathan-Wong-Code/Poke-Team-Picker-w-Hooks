import database, { firebase, googleAuthProvider } from './../firebase/firebase';
import { LOGIN, LOGOUT, LOGIN_GUEST, SET_SAVED_TEAMS } from './types';
import regeneratorRuntime from 'regenerator-runtime';

export const startLogin = () => async dispatch => {
  await firebase.auth().signInWithPopup(googleAuthProvider);
};

export const startLogout = () => async dispatch => {
  await firebase.auth().signOut();
};

export const login = (uid) => ({
  type : LOGIN,
  uid
});

export const loginGuest = () => async (dispatch, getState) => {
  dispatch({ type : LOGIN_GUEST }); 

  const uid = getState().auth.uid;
  const response = await database.ref(`users/${uid}/pokemon`).once('value');
  const savedTeams = {};
  response.forEach(team => {
    savedTeams[team.key] = {
      ...team.val(),
      id : team.key
    }
  });

  dispatch({
    type : SET_SAVED_TEAMS,
    savedTeams
  });
};

export const logout = () => ({
  type : LOGOUT
});
