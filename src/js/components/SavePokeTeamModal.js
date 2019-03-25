import React, { useState } from 'react';

const SavePokeTeamModal = ({ pokeTeam, toggleModal, type, handleSaveTeam, history }) => {
  const [name, setName] = useState(pokeTeam ? pokeTeam.name : '');
  const [description, setDescription] = useState(pokeTeam ? pokeTeam.description : '');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setDescription(e.target.value);
  };

  const onBackClick = () => {
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Must enter a team name to save.');
    } else {
      handleSaveTeam(name,description);
      history.push('/SavedTeams');
    }
  }

  const renderMessage = () => {
    return (
      error ? `${error}` : 'Enter a name and description for your team.'
    );
  };


  return (
    <div className='modal__background' 
      onClick={() => toggleModal()}
      data-test='save-form-component'
    >
      <div className='save-form modal__body' 
        onClick={(e) => e.stopPropagation()}
        data-test='save-form-modal-body'
      >
        <form 
          action='' 
          className='save-form__form' 
          onSubmit={handleSubmit}
          data-test='save-form-form'
        >
          <h2 className='save-form__message' data-test='save-form-message'>
            {renderMessage()}
          </h2>

          <label htmlFor='team-name' className='visuallyhidden'>Enter Team Name</label>
          <input 
            type='text' 
            placeholder='Team Name' 
            value={name}
            onChange={handleInputChange}
            className='save-form__name save-form__input'
            id='team-name'
            data-test='save-form-input'
          />

          <label 
            htmlFor='team-description' 
            className='visuallyhidden'>
            Enter Team Description
          </label>

          <textarea 
            name='' 
            id='' 
            cols='20' 
            rows='10'
            placeholder='Team Description' 
            value={description}
            onChange={handleTextAreaChange}
            className='save-form__description save-form__input'
            id='team-description'
            data-test='save-form-textarea'
          />

          <div className='save-form__buttons'>
            <button 
              className='save-form__save save-form__button btn' 
              type='submit'
              data-test='save-form-submit'
            >
              {type === 'create' ? 'Save Team' : 'Edit Team'}
            </button>
            
            <button 
              className='save-form__back save-form__button btn' 
              onClick={onBackClick}
              type='button'
              data-test='save-form-back'
            >
            Back 
            </button>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default SavePokeTeamModal;
