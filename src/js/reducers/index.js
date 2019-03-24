import { combineReducers } from 'redux';
import authReducer from './auth';
import pokeTeamReducer from './pokeTeam';

const reducers = combineReducers({
  auth : authReducer,
  savedTeams : pokeTeamReducer
});

export default reducers;
