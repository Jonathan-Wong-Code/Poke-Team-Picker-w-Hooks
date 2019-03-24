import { ADD_TEAM, DELETE_TEAM, EDIT_TEAM, SET_SAVED_TEAMS } from './types';
import database from './../firebase/firebase';
import regeneratorRuntime from "regenerator-runtime";

export const addPokeTeam = (pokeTeam) => async (dispatch, getState) => {
  const uid = getState().auth.uid;
  const response = await database.ref(`users/${uid}/pokemon`).push(pokeTeam);
  const newTeamObject = ({
    ...pokeTeam,
    id: response.key
  })

  dispatch({
    type : ADD_TEAM,
    team : newTeamObject
  });

  return response.key
};

export const deletePokeTeam = (id) => async (dispatch, getState) => {
  const uid = getState().auth.uid;
  database.ref(`users/${uid}/pokemon/${id}`).remove();

  dispatch({
    type : DELETE_TEAM,
    id
  });
};

export const editPokeTeam = (pokeTeam) => async (dispatch, getState) => {
  const uid = getState().auth.uid;
  database.ref(`users/${uid}/pokemon/${pokeTeam.id}`).update(pokeTeam);

  dispatch({
    type : EDIT_TEAM,
    team : pokeTeam
  });
};

export const setSavedTeams = () => async (dispatch, getState) => {
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
    type: SET_SAVED_TEAMS,
    savedTeams
  });
}
