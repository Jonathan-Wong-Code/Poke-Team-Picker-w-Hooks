import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokeSearch = async (endpoint) => {
  const [result, setResult] = useState([]);
  console.log('hooking');
  const getPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/${endpoint}`, {
      params : {
        limit : 151
      }
    });
    await setResult(response.data);
  };

  useEffect(() => {
    console.log('getting pokemon');
    getPokemon();
  }, [endpoint]);

  return result;
};

export default usePokeSearch;
