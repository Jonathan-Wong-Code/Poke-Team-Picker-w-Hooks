import React from 'react';
import PokeTeamListItem from './PokeTeamListItem';

const PokeTeamList = ({ pokeTeam, handleRemovePokemon }) => {
  const renderPokeTeam = () => { 
    return pokeTeam.length > 0 ? (
      pokeTeam.map(pokemon => {
        return (
          <PokeTeamListItem 
            key={pokemon.uniqueId} 
            pokemon={pokemon} 
            handleRemovePokemon={handleRemovePokemon}
            data-test='poke-team-list-item'
          />
        );
      })) : null;
  };

  return (
    <section className='poke-team' data-test='poke-team-list-component'>
      <ul className='poke-team__list'>
        {renderPokeTeam()}
      </ul>
    </section>
  );
};

export default PokeTeamList;
