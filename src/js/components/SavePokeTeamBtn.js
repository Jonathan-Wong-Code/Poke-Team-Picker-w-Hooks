import React from 'react';

const SavePokeTeamBtn = ({ toggleModal, type, pokeTeam }) => {
  const onButtonClick = () => {
    toggleModal();
  };

  const disabledStatus = pokeTeam.length < 6 ? true : false;

  return (
    <div className='save-team' data-test='save-team-btn-component'>
      {pokeTeam.length !== 0 && (
        <button 
          onClick={onButtonClick} 
          className='save-team__btn btn' 
          disabled={disabledStatus}
          data-test='save-team-submit'
        >
          {type === 'create' ? 'Save Team' : 'Edit Team'}
        </button>
      )}
      <p className='save-team__text'> Search and pick 6 Pokemon to save. 
        { window.innerWidth > 550 &&  
          (
            <span data-test='save-team-current-num'>
              Currently {pokeTeam.length}/6.
            </span>
          )
        } 
      </p>
      {window.innerWidth < 550 && <p className='save-team__text'>Currently {pokeTeam.length}/6.</p>}
    </div>
  );
};

export default SavePokeTeamBtn;
