import React, { useEffect, useRef } from 'react';
import PokemonTypes from './PokemonTypes';

const Modal = ({pokemon, handleAddPokemon, handleTogglePokeModal, error}) =>{
  const pokeModalButton = useRef(null);
  
  useEffect(() => {
    pokeModalButton.current.focus();
  }, []);
 
  const renderTypes = () => pokemon.types.map(type => {
    return <PokemonTypes type={type} key={type.type.name} />;
  });
  
  const renderAbilities = () => pokemon.abilities.map(ability => {
    return (
      <li 
        className='modal__ability' 
        key={ability.ability.name}
        data-test='modal-ability'
      > 
        {ability.ability.name} 
      </li>    
    );
  });

  const renderStats = () => pokemon.stats.map(stat => (
    <li key={stat.stat.name} data-test='modal-stat'>
      <span className='modal__stat-name'>
        { stat.stat.name }:
      </span> {stat.base_stat}
    </li>
  ));

  return (
    <div className='modal__background' onClick={handleTogglePokeModal}
      data-test='modal-component'
    >
      <div className='modal__body' onClick={(e) => e.stopPropagation()}
        data-test='modal-body'
      >
        <div className='modal__img-box'>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className='modal__img'
            data-test='modal-img'
          />
        </div>
        <h2 className='modal__name' data-test='modal-name'>
          {pokemon.name}
        </h2>
        <ul className='modal__attributes'>
          <li className='modal__types' data-test='modal-type'>
            <span className='modal__stat-name'>type: </span>
            {renderTypes()}
          </li>
    
          <li className='modal__stats'>
            <ul className='modal__stats-list'>
              {renderStats()}
            </ul>
          </li>

          <li className='modal__abilities'>
            <span className='modal__stat-name modal__ability-tag'>abilities: </span>
            <ul className='modal__abilities-list'>
              {renderAbilities()}
            </ul>
          </li>
        </ul>
        {error && <p className='modal__error'>{error}</p>}
        <div className='modal__buttons'>
          <button 
            onClick={handleAddPokemon} 
            className='btn modal__btn'
            ref={pokeModalButton}
            data-test='modal-save'
          >
              Save to team
          </button>
          <button 
            onClick={handleTogglePokeModal} 
            className='btn modal__btn'
            data-test='modal-cancel'
          >
              Cancel
          </button>
        </div>
      </div>
    </div>   
  );
};


export default Modal;
