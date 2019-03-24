import React from 'react';

const PokemonTypes = ({ type }) => {
  return (
    <span className={`pokemon-type pokemon-type--${type.type.name}`} key={type.type.name}>     
      {type.type.name}
    </span>
  );
};

export default PokemonTypes;
