import React, { useState, useEffect, useReducer, useContext } from 'react';
import moment from 'moment';
import pokeapi from '../apis/pokeapi';
import PokeList from './PokeList';
import SearchBar from './SearchBar';
import PokeTeamList from './PokeTeamList';
import SaveTeamListBtn from './SavePokeTeamBtn';
import SavePokeTeamModal from './SavePokeTeamModal';
import currentPokeTeamReducer from './../reducers/currentPokeTeamReducer';
import PokeTeamListContext from './../context/PokeTeamList';
import PokeListContext from './../context/PokeList';
import usePokeSearch from './../hooks/usePokeSearch';

const BuildPokeTeamPage = (props) => {
  const data = usePokeSearch('/pokemon');

  const [textFilter, setTextFilter] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [currentPokemonTeam, teamDispatch] 
    = useReducer(currentPokeTeamReducer, props.pokeTeam ? props.pokeTeam.pokemon : []);
  
  useEffect(() => {
    setSearchedPokemon(data ? data.results : []);
  }, [data]);
  // const getInitialPokemon = async () => {
  //   const response = await pokeapi.get('/pokemon');
  //   setSearchedPokemon(response.data.results);
  // };

  // useEffect(() => {
  //   getInitialPokemon();
  // }, []);

  const toggleModal = () => {
    setShowSaveModal(true);
  };
 
  const handleSaveTeam = (name, description) => {
    const newTeamObj = {
      pokemon : currentPokemonTeam,
      name,
      description,
      createdAt : props.pokeTeam ? moment(props.pokeTeam.createdAt).valueOf() : moment().valueOf(),
      id : props.pokeTeam ? props.pokeTeam.id : null
    };
    
    if (props.type === 'create') {
      props.handleAddTeam(newTeamObj);
    } else {
      props.handleEditTeam(newTeamObj);
    }
  };

  const handlePokeSearch = async (textFilter, type) => {
    if (type !== 'all') {
      try {
        const response = await pokeapi.get(`/type/${type}`);
        const formattedPokeData = response.data.pokemon.map(pokemon => {
          return pokemon.pokemon;
        });
        setSearchedPokemon(formattedPokeData);
      } catch (error) {
        throw error;
      }   
    } else {
      try {
        const response = await pokeapi.get('/pokemon');
        setSearchedPokemon(response.data.results);
      } catch (error) {
        throw error;
      } 
    }
    
    setTextFilter(textFilter);
  };
  
  const renderHeading = () => (
    props.pokeTeam ? (
      <h2 className='build-page__heading'>
        Editing Team
      </h2>
    ) : null
  );

  if (!searchedPokemon === 0) {
    return (
      <div>Loading</div>
    );
  } 

  return (
    <section className='build-page'>
      <section className='build-page__poke-team'>
        {renderHeading()}

        <PokeTeamListContext.Provider value={{ pokeTeam : currentPokemonTeam, teamDispatch }}>
          <PokeTeamList />      
        </PokeTeamListContext.Provider>

        <SaveTeamListBtn 
          pokeTeam={currentPokemonTeam}
          toggleModal={toggleModal}
          type={props.type}
        />  
      </section>
      {
        
        showSaveModal && (
          <SavePokeTeamModal 
            toggleModal={toggleModal}
            handleSaveTeam={handleSaveTeam}
            pokeTeam={props.pokeTeam ? props.pokeTeam : null}
            type={props.type}
            history={props.history}
          />
        )
      }
      <section className='build-page__poke-search'>
        <div className='wrapper poke-search__wrapper'>
          <SearchBar handlePokeSearch={handlePokeSearch} />
          <PokeListContext.Provider value={
              { pokemon : searchedPokemon, textFilter, teamDispatch, currentPokemonTeam }
            }
          >
            <PokeList />
          </PokeListContext.Provider>
        </div> 
      </section>
    </section>
  );
};

export default BuildPokeTeamPage;
