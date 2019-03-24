import React from 'react';

export class ConfirmSave extends React.Component {
  constructor() {
    super();

    this.closeBtn = React.createRef();
  }

  componentDidMount() {
    this.closeBtn.current.focus();
  }
  
  render() {
    return (
      <div 
        className='modal__background' 
        onClick={this.props.handleToggleSaveModal} 
        data-test='confirm-save-component'
      >
        <div className='confirm-save__modal' onClick={(e) => e.stopPropagation()}
          data-test='confirm-save-body'
        >
          <p data-test='confirm-save-text'>Saved <span className='confirm-save__name'>
              {this.props.pokemon.name}
            </span>
          </p>
          <button 
            onClick={this.props.handleToggleSaveModal} 
            className='btn confirm-save__btn'
            data-test='confirm-save-close-btn'
            ref={this.closeBtn}
          >
          Close
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmSave;
