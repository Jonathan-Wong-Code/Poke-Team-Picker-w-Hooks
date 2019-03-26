import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokeSearch = (endpoint) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    const getPokemon = async () => {
      try {   
        const response = await axios.get(`https://pokeapi.co/api/v2${endpoint}`, {
          params : {
            limit : 151
          }
        });
        if (mounted) {
          setResult(response.data);
        }
      } catch (error) { 
        throw error;
      }
    };
    
    getPokemon();
  
    return () => {
      mounted = false;
    };
  }, []);

  return result;
};


export default usePokeSearch;
