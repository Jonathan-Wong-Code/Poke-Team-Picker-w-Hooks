import { ADD_TEAM, 
  EDIT_TEAM, 
  SET_SAVED_TEAMS, 
  LOGOUT,
  DELETE_TEAM 
} 
from './../../actions/types';
import pokeTeamReducer from './../../reducers/pokeTeam';
import pokeTeam from './../fixtures/pokeTeam';

describe('The pokeTeam Reducer', () => {
  it('Should add a team to pokeTeam state', () => {
    const action = {
      type : ADD_TEAM,
      team : pokeTeam.team1
    };

    const result = pokeTeamReducer({}, action);
    expect(result).toEqual({
      [pokeTeam.team1.id] : pokeTeam.team1
    });
  });

  it('Should edit a team', () => {
    const updates = {
      ...pokeTeam.team1,
      name: 'new name'
    }

    const action = {
      type: EDIT_TEAM,
      team : updates
    }

    const result = pokeTeamReducer({}, action);
    expect(result).toEqual({
     [pokeTeam.team1.id] : updates
    })
  });

  it('Should delete a team', () => {
    const action = {
      type: DELETE_TEAM,
      id : pokeTeam.team1.id
    }

    const result = pokeTeamReducer({
      [pokeTeam.team1.id] : pokeTeam.team1,
      [pokeTeam.team2.id] : pokeTeam.team2,
      [pokeTeam.team3.id] : pokeTeam.team3
    }, action);

    expect(result).toEqual({
      [pokeTeam.team2.id] : pokeTeam.team2,
      [pokeTeam.team3.id] : pokeTeam.team3
    })
  })

  it('Should set the saved teams from firebase', () => {
    const action = {
      type: SET_SAVED_TEAMS,
      savedTeams : {
        [pokeTeam.team1.id] : pokeTeam.team1,
        [pokeTeam.team2.id] : pokeTeam.team2,
        [pokeTeam.team3.id] : pokeTeam.team3
      }
    }

    const result = pokeTeamReducer({}, action);
    expect(result).toEqual({
        [pokeTeam.team1.id] : pokeTeam.team1,
        [pokeTeam.team2.id] : pokeTeam.team2,
        [pokeTeam.team3.id] : pokeTeam.team3
    });
  });

  it('should reset the saved teams', () => {
    const initialState = {
      [pokeTeam.team1.id] : pokeTeam.team1,
      [pokeTeam.team2.id] : pokeTeam.team2,
      [pokeTeam.team3.id] : pokeTeam.team3
    }
    const action = {
      type: LOGOUT
    }

    const result = pokeTeamReducer({initialState}, action);
    expect(result).toEqual({});
  })
});
