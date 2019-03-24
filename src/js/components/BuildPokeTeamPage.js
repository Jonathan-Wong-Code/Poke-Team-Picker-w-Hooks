import React from 'react';
import uuid from 'uuid';
import moment from 'moment';
import pokeapi from '../apis/pokeapi';
import PokeList from './PokeList';
import SearchBar from './SearchBar';
import PokeTeamList from './PokeTeamList';
import SaveTeamListBtn from './SavePokeTeamBtn'
import SavePokeTeamModal from './SavePokeTeamModal';
import regeneratorRuntime from 'regenerator-runtime';

class BuildPokeTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFilter : '',
      pokemon : [],
      currentPokemonTeam : this.props.pokeTeam ? this.props.pokeTeam.pokemon : [],
      pokemonTeamToSave : {},
      showSaveModal : false,
      searchError : ''
    };
  }

  async componentDidMount() {
    const response = await pokeapi.get('/pokemon');
    this.setState({ pokemon : response.data.results });
  }

  toggleModal = () => {
    this.setState((prevState)=> ({
      showSaveModal : !prevState.showSaveModal
    }));
  }
 
  handleSaveTeam = (name, description) => {
    const newTeamObj = {
      pokemon : this.state.currentPokemonTeam,
      name,
      description,
      createdAt : this.props.pokeTeam? moment(this.props.pokeTeam.createdAt).valueOf() : moment().valueOf(),
      id : this.props.pokeTeam ? this.props.pokeTeam.id : null
    }
    
    if(this.props.type ==='create') {
      this.props.handleAddTeam(newTeamObj);
    } else {
      this.props.handleEditTeam(newTeamObj);
    }
  }

  handleAddPokemon = (pokemon) => {
    const uniqueId = uuid();
    this.setState((prevState) => ({
      currentPokemonTeam : [...prevState.currentPokemonTeam, {
        uniqueId,
        ...pokemon
      }]
    }));
  }

  handleRemovePokemon = (id) => {
    this.setState((prevState) => {
      const newState = prevState.currentPokemonTeam
        .filter(pokemon => pokemon.uniqueId !== id)
      return {
        currentPokemonTeam : newState
      }
    })
  }
 
  handlePokeSearch = async (textFilter, type) => {
    if(type !=='all') {
      try {
        const response = await pokeapi.get(`/type/${type}`);
        const formattedPokeData = response.data.pokemon.map(pokemon => {
          return pokemon.pokemon;
        });

        this.setState({ pokemon : formattedPokeData });
      } catch (error) {
        throw error;
      }   
    } else {
      try {
        const response = await pokeapi.get('/pokemon');
        this.setState({ pokemon : response.data.results });
      } catch (error) {
        throw error
      } 
    }
    
    this.setState({ textFilter })
  }
  
  renderHeading = () => (
    this.props.pokeTeam ? 
    <h2 className='build-page__heading'>
      Editing Team
    </h2> 
    : null
  )

  render() {
    if(!this.state.pokemon) return <div />
    return (
      <section className='build-page'>
        <section className='build-page__poke-team'>
          {this.renderHeading()}
          <PokeTeamList 
            pokeTeam ={this.state.currentPokemonTeam}
            handleRemovePokemon = {this.handleRemovePokemon}
          />

          <SaveTeamListBtn 
            pokeTeam ={this.state.currentPokemonTeam}
            toggleModal={this.toggleModal}
            type={this.props.type}
          />  
        </section>
        {
          this.state.showSaveModal && 
            <SavePokeTeamModal 
              toggleModal={this.toggleModal}
              handleSaveTeam={this.handleSaveTeam}
              history={this.props.history}
              pokeTeam = {this.props.pokeTeam ? this.props.pokeTeam : null}
              type={this.props.type}
            />
        }
        <section className='build-page__poke-search'>
          <div className='wrapper poke-search__wrapper'>
            <SearchBar 
              handlePokeSearch = {this.handlePokeSearch}
            />
            
            <PokeList 
              pokemon ={this.state.pokemon} 
              textFilter ={this.state.textFilter}
              handleAddPokemon = {this.handleAddPokemon}
              currentPokemonTeam = {this.state.currentPokemonTeam}
            />
          </div> 
        </section>
      </section>
    );
  }
}

export default BuildPokeTeamPage;
