import React from 'react';
import PokeCard from './PokeCard';
import Modal from './Modal';
import ConfirmSave from './ConfirmSave';

class PokeList extends React.Component { 
  constructor() {
    super();

    this.state = {
      showPokeModal : false,
      showSaveModal: false,
      currentPokemon : null,
      error : ''
    };
  } 

  setPokemon = (currentPokemon) => {
    this.setState({ currentPokemon });
  }

  renderPokemon = () => {
    const filteredPokemon = this.props.pokemon.filter(pokemon => {
      return pokemon.name.includes(this.props.textFilter.toLowerCase());
    })
    
  if(filteredPokemon.length === 0){
    return (
        <h2 className='poke-list__no-results'>No Results</h2>
      )
    }
  return (
      filteredPokemon.map(pokemon => (
        <PokeCard 
          key={pokemon.name} 
          pokemon={pokemon} 
          handlePokeCardClick={this.handlePokeCardClick} 
        />
      ))    
    ) 
  }

  handlePokeCardClick = (currentPokemon) => {
    this.setState({ currentPokemon });
    this.handleTogglePokeModal();
  }

  handleTogglePokeModal =() => {
    this.setState(prevState => {
      return {
        showPokeModal : !prevState.showPokeModal
      }
    })
  }

  handleToggleSaveModal = () => {
    this.setState(prevState => {
      return {
        showSaveModal : !prevState.showSaveModal
      }
    })
  }

  handleAddPokemon = () => {
    if(this.props.currentPokemonTeam.length < 6){
      this.props.handleAddPokemon(this.state.currentPokemon);
      this.handleToggleSaveModal();
      this.handleTogglePokeModal();
    } else {
      this.setState({ error : 'Team full! Remove a member' });
    }    
  }

  render() {
    return (
      <React.Fragment>
        <div className='poke-list'>
            <ul className='poke-list__grid'>
              {this.renderPokemon()}
            </ul>
        </div>
      { 
        this.state.showPokeModal && 
        <Modal
          pokemon={this.state.currentPokemon}
          handleTogglePokeModal={this.handleTogglePokeModal}
          handleAddPokemon={this.handleAddPokemon}
          error={this.state.error}
          handleSetFocus={this.handleSetFocus}
        /> 
      }

      {
        this.state.showSaveModal &&
        <ConfirmSave
          pokemon={this.state.currentPokemon}
          handleToggleSaveModal={this.handleToggleSaveModal}
        />
      }
    </React.Fragment>
    )
  }
};

export default PokeList;