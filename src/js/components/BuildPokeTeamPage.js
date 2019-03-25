import React, {useState, useEffect, useReducer, useContext} from 'react';
import uuid from 'uuid';
import moment from 'moment';
import pokeapi from '../apis/pokeapi';
import PokeList from './PokeList';
import SearchBar from './SearchBar';
import PokeTeamList from './PokeTeamList';
import SaveTeamListBtn from './SavePokeTeamBtn'
import SavePokeTeamModal from './SavePokeTeamModal';
import regeneratorRuntime from 'regenerator-runtime';
import currentPokeTeamReducer from './../reducers/currentPokeTeamReducer';
import PokeTeamListContext from './../context/PokeTeamList';


const BuildPokeTeamPage = (props) => {
  const [textFilter, setTextFilter] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [currentPokemonTeam, teamDispatch] = useReducer(currentPokeTeamReducer, props.pokeTeam ? props.pokeTeam.pokemon : [])

  const getInitialPokemon = async () => {
    const response = await pokeapi.get('/pokemon');
    await setSearchedPokemon(response.data.results);
  }

  useEffect(() => {
    getInitialPokemon();
  },[]);

  const toggleModal = () => {
    setShowSaveModal(true);
  }
 
  const handleSaveTeam = (name, description) => {
    const newTeamObj = {
      pokemon : currentPokemonTeam,
      name,
      description,
      createdAt : props.pokeTeam? moment(props.pokeTeam.createdAt).valueOf() : moment().valueOf(),
      id : props.pokeTeam ?props.pokeTeam.id : null
    }
    
    if(props.type ==='create') {
      props.handleAddTeam(newTeamObj);
    } else {
      props.handleEditTeam(newTeamObj);
    }
  }

  const handleAddPokemon = (pokemon) => {
    const uniqueId = uuid();
    teamDispatch({
      type: "ADD_POKEMON",
      pokemon : {
        uniqueId,
        ...pokemon
      }
    })
  }

  const handlePokeSearch = async (textFilter, type) => {
    if(type !=='all') {
      try {
        const response = await pokeapi.get(`/type/${type}`);
        const formattedPokeData = response.data.pokemon.map(pokemon => {
          return pokemon.pokemon;
        });
        setSearchedPokemon(formattedPokeData)
      } catch (error) {
        throw error;
      }   
    } else {
      try {
        const response = await pokeapi.get('/pokemon');
        setSearchedPokemon(response.data.results);
      } catch (error) {
        throw error
      } 
    }
    
    setTextFilter(textFilter);
  }
  
  const renderHeading = () => (
    props.pokeTeam ? 
    <h2 className='build-page__heading'>
      Editing Team
    </h2> 
    : null
  )

    if(searchedPokemon.length === 0) {
      <div>Loading</div>
    } 

    return (
      <section className='build-page'>
        <section className='build-page__poke-team'>
          {renderHeading()}

          <PokeTeamListContext.Provider value ={{pokeTeam : currentPokemonTeam, teamDispatch}}>
            <PokeTeamList />      
          </PokeTeamListContext.Provider>

          <SaveTeamListBtn 
            pokeTeam ={currentPokemonTeam}
            toggleModal={toggleModal}
            type={props.type}
          />  
        </section>
        {
          showSaveModal && 
            <SavePokeTeamModal 
              toggleModal={toggleModal}
              handleSaveTeam={handleSaveTeam}
              history={props.history}
              pokeTeam = {props.pokeTeam ? props.pokeTeam : null}
              type={props.type}
            />
        }
        <section className='build-page__poke-search'>
          <div className='wrapper poke-search__wrapper'>
            <SearchBar 
              handlePokeSearch = {handlePokeSearch}
            />
            
            <PokeList 
              pokemon = {searchedPokemon} 
              textFilter ={textFilter}
              handleAddPokemon = {handleAddPokemon}
              currentPokemonTeam = {currentPokemonTeam}
            />
          </div> 
        </section>
      </section>
    );
  }

export default BuildPokeTeamPage;
