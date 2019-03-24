import { storeFactory } from './../testutils';
import { addPokeTeam, deletePokeTeam, editPokeTeam, setSavedTeams } from './../../actions/pokeTeam';
import database from './../../firebase/firebase';
import pokeTeam from './../fixtures/pokeTeam';
import regeneratorRuntime from "regenerator-runtime";

const uid = 'test123';

describe('the addPokeTeam action creator', () => {
  let store;
  beforeEach(async (done) => {
    await database.ref(`users/${uid}/pokemon/${pokeTeam.team3.id}`).set(pokeTeam.team3).then(() => done());
    const initialState = {
      savedTeams : {
        [pokeTeam.team3.id] : pokeTeam.team3
      },

      auth : {
        uid
      }
    };
    store = storeFactory(initialState);
  });

  it('Should add a pokemon to the redux store and firebase', async () => {
      const ref = await store.dispatch(addPokeTeam(pokeTeam.team1));
      const newState = store.getState();
     
      expect(newState.savedTeams).toEqual({
        [ref] : {
          ...pokeTeam.team1,
          id: ref
        }, 
        [pokeTeam.team3.id] : pokeTeam.team3
    });
  });

  it('should delete a poketeam from redux and firebase', async () => {
    await store.dispatch(deletePokeTeam(pokeTeam.team3.id));
    const newState = store.getState();
    expect(newState.savedTeams).toEqual({});
    
    const snapshot = await database.ref(`users/${uid}/pokemon/${pokeTeam.team3.id}`).once('value');
    expect(snapshot.val()).toBeFalsy();
  });

  it('should edit a pokemon team in redux and firebase', async () => {
    const updatedTeam =  {
      id : 'team3',
      name : 'pokeTeam1edit',
      description : 'This is pokeTeam1',
      pokemon : [{
        name : 'pokemona',
        sprites : { front_default : 'sprite1' }
      }, {
        name : 'pokemonb',
        sprites : { front_default : 'sprite2' }
      }, {
        name : 'pokemonc',
        sprites : { front_default : 'sprite3' }
      }, {
        name : 'pokemond',
        sprites : { front_default : 'sprite4' }
      }, {
        name : 'pokemone',
        sprites : { front_default : 'sprite5' }
      }, {
        name : 'pokemonf',
        sprites : { front_default : 'sprite6' }
      }]
    }

    await store.dispatch(editPokeTeam(updatedTeam))
    const newState = store.getState();
    expect(newState.savedTeams).toEqual({
      [pokeTeam.team3.id] : updatedTeam
    });
    
    const snapshot = await database.ref(`users/${uid}/pokemon/${pokeTeam.team3.id}`).once('value');
    expect(snapshot.val()).toEqual(updatedTeam);
  });
})//end describe

describe("the setSavedTeams action creator", () => {
  let store;
  beforeEach(() => {
    database.ref(`users/${uid}/pokemon`).set(pokeTeam);
    const initialState = {
      auth : {
        uid
      },

      savedTeams : {}
    }
    store=storeFactory(initialState);
  });

  it("Should set the state as the saved pokemon teams on firebase", async () => {
    await store.dispatch(setSavedTeams());
    const newState = store.getState();
    expect(newState.savedTeams).toEqual(pokeTeam);
  })
})