import React, { useState } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

const SearchBar = ({ handlePokeSearch }) => {
  const [type, setType] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  
  const handleInputChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePokeSearch(textFilter, type);
    setTextFilter('');
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
 
  return (
    <div className='search-bar' data-test='search-bar-component'>
      <form action='' onSubmit={handleSubmit} className='search-bar__form' data-test='search-bar-form'>
        <span className='visuallyhidden' htmlFor='search-name'>Search by name</span>
        <input 
          type='text' 
          placeholder='Search Pokemon' 
          id='search-name'
          className='search-bar__name search-bar__item'
          data-test='search-bar-input'
          value={textFilter}
          onChange={handleInputChange}
        />

        <span className='visuallyhidden' htmlFor='search-type'>Search pokemon by type</span>
        <select 
          name='' 
          id='search-type' 
          onChange={handleTypeChange} 
          value={type}  
          className='search-bar__type search-bar__item'
          data-test='search-bar-select'
        >
          <option value='all'> all</option>
          <option value='normal'>normal</option>
          <option value='fighting'>fighting</option>
          <option value='water'>water</option>
          <option value='flying'>flying</option>
          <option value='grass'>grass</option>
          <option value='poison'>poison</option>
          <option value='electric'>electric</option>
          <option value='ground'>ground</option>
          <option value='psychic'>psychic</option>
          <option value='rock'>rock</option>
          <option value='ice'>ice</option>
          <option value='bug'>bug</option>
          <option value='dragon'>dragon</option>
          <option value='ghost'>ghost</option>
          <option value='dark'>dark</option>
          <option value='steel'>steel</option>
          <option value='fairy'>fairy</option>
          <option value='fire'>fire</option>
        </select> 

        <button 
          type='Submit'
          className='search-bar__submit search-bar__item btn'
          data-test='search-bar-submit'
        >
          Search
        </button>
      </form>
    </div>
  );
};


export default SearchBar;
