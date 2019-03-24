import React, {useRef, useEffect } from 'react';

const ConfirmSave = ({ handleToggleSaveModal, pokemon}) => {

  const closeBtn = useRef(null);
  
  useEffect(() => {
    closeBtn.current.focus();
  }, []);

  return (
    <div 
      className='modal__background' 
      onClick={handleToggleSaveModal} 
      data-test='confirm-save-component'
    >
      <div className='confirm-save__modal' onClick={(e) => e.stopPropagation()}
        data-test='confirm-save-body'
      >
        <p data-test='confirm-save-text'>Saved <span className='confirm-save__name'>
            {pokemon.name}
          </span>
        </p>
        <button 
          onClick={handleToggleSaveModal} 
          className='btn confirm-save__btn'
          data-test='confirm-save-close-btn'
          ref={closeBtn}
        >
        Close
        </button>
      </div>
    </div>
  );
};


export default ConfirmSave;
