import React, { useContext } from 'react';
import PokeTeamListItem from './PokeTeamListItem';
import PokeTeamListContext from './../context/PokeTeamList';

const PokeTeamList = () => {
  const { pokeTeam } = useContext(PokeTeamListContext);

  const renderPokeTeam = () => { 
    return pokeTeam.length > 0 ? (
      pokeTeam.map(pokemon => {
        console.log(pokemon);
        return (
          <PokeTeamListItem 
            key={pokemon.uniqueId} 
            pokemon={pokemon} 
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
