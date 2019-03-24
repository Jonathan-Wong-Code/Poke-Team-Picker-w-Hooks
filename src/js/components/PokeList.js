import React, { useState } from 'react';
import PokeCard from './PokeCard';
import Modal from './Modal';
import ConfirmSave from './ConfirmSave';

const PokeList = ({pokemon, handleAddPokemon, textFilter, currentPokemonTeam }) => { 
  const [showPokeModal, setShowPokeModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const handleTogglePokeModal = () => {
    setShowPokeModal(!showPokeModal);
  };

  const handleToggleSaveModal = () => {
    setShowSaveModal(!showSaveModal);
  };

  const handleAddTeamPokemon = () => {
    if (currentPokemonTeam.length < 6) {
      handleAddPokemon(currentPokemon);
      handleToggleSaveModal();
      handleTogglePokeModal();
    } else {
      setError('Team full! Remove a member');
    }    
  };

  const handlePokeCardClick = (currentPokemon) => {
    setCurrentPokemon(currentPokemon);
    handleTogglePokeModal();
  };

  const renderPokemon = () => {
    const filteredPokemon = pokemon.filter(pokemon => {
      return pokemon.name.includes(textFilter.toLowerCase());
    });
    
    if (filteredPokemon.length === 0) {
      return (
        <h2 className='poke-list__no-results'>No Results</h2>
      );
    }

    return (
      filteredPokemon.map(pokemon => (
        <PokeCard 
          key={pokemon.name} 
          pokemon={pokemon} 
          handlePokeCardClick={handlePokeCardClick} 
        />
      ))    
    );
  };

  return (
    <React.Fragment>
      <div className='poke-list'>
        <ul className='poke-list__grid'>
          {renderPokemon()}
        </ul>
      </div>
      { 
        showPokeModal && 
        <Modal
          pokemon={currentPokemon}
          handleTogglePokeModal={handleTogglePokeModal}
          handleAddPokemon={handleAddTeamPokemon}
          error={error}
        /> 
      }

      {
        showSaveModal &&
        <ConfirmSave
          pokemon={currentPokemon}
          handleToggleSaveModal={handleToggleSaveModal}
        />
      }
    </React.Fragment>
  )
  
};

export default PokeList;