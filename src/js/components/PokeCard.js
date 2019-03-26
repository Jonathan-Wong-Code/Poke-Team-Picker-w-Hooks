import React, { useState, useEffect } from 'react';
import pokeapi from './../apis/pokeapi';
import regeneratorRuntime from 'regenerator-runtime';
import usePokeSearch from './../hooks/usePokeSearch';

const PokeCard = ({ handlePokeCardClick, pokemon }) => {
  const currentPokemon = usePokeSearch(`/pokemon/${pokemon.name}`);

  const onPokeCardClick = () => {
    handlePokeCardClick(currentPokemon);
  };

  const onPokeCardKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePokeCardClick(currentPokemon);
    }
  };

  if (!currentPokemon) return <div />;
  if (currentPokemon.sprites.front_default) {
    return (
      <li 
        onClick={onPokeCardClick} 
        tabIndex='0' 
        className='poke-card__item'   
        onKeyPress={onPokeCardKeyPress}
        data-test = 'poke-card-item'
      >
        <div className='poke-card__img-box'>
          <img 
            src={currentPokemon.sprites.front_default} 
            alt={`A sprite image of ${currentPokemon.name}`}
            data-test='poke-card-img'
          />
        </div>
        <p className='poke-card__name' data-test='poke-card-name'>
          {currentPokemon.name}
        </p>
      </li>       
    ); 
  } else {
    return <React.Fragment />;
  } 
};


export default PokeCard;
