import { ADD_TEAM, DELETE_TEAM, EDIT_TEAM, SET_SAVED_TEAMS, LOGOUT } from './../actions/types';

const pokeTeamReducer = (state = {}, action) => {
  switch(action.type) {

    case ADD_TEAM :
    return {...state, [action.team.id] : action.team }

    case DELETE_TEAM :
    const newState = Object.assign({}, state);
    delete newState[action.id];
    return newState;

    case EDIT_TEAM :
    return {...state, [action.team.id] : action.team}

    case SET_SAVED_TEAMS:
    return action.savedTeams;

    case LOGOUT:
    return {}

    default:
    return state;
  }
}

export default pokeTeamReducer;
