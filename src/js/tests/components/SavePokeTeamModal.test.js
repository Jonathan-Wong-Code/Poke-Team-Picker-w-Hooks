import React from 'react';
import { mount } from 'enzyme';
import SavePokeTeamModal from '../../components/SavePokeTeamModal';
import { singlePokeTeam } from './../fixtures/pokeTeam';

describe('The SavePokeTeamModal component creating new team (No PokeTeam Props)', () => {
  let wrapper, toggleModal, handleSaveTeam, history, type;
  beforeEach(() => {
    handleSaveTeam = jest.fn();
    history = { push : jest.fn()};
    type = 'create';
    toggleModal = jest.fn();

    const defaultProps = {
      handleSaveTeam,
      history,
      type,
      toggleModal
    }
    wrapper = mount(<SavePokeTeamModal {...defaultProps} />)
  });

  it('Should render the SavePokeTeamModal', () => {
    expect(wrapper.find(`[data-test='save-form-component']`).length).toBe(1);
  });

  it('Should take a snapshot of the SavePokeTeam Modal', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should close the modal when the modal background is clicked', () => {
    wrapper.find(`[data-test='save-form-component']`).simulate('click');
    expect(toggleModal).toHaveBeenCalled();
  });

  it('Should not close the modal when the modal body is clicked', () => {
    wrapper.find(`[data-test='save-form-modal-body']`).simulate('click');
    expect(toggleModal).not.toHaveBeenCalled();
  });

  it('Should have an input that the user can enter a team name into', () => {
    wrapper.find(`[data-test='save-form-input']`).simulate('change', {
      target : { value : 'test123' }
    });

    expect(wrapper.find(`[data-test='save-form-input']`).prop('value')).toBe('test123');
    expect(wrapper.state('name')).toBe('test123');
  });

  it('Should have a textarea the user can enter a team description into to', () => {
    wrapper.find(`[data-test='save-form-textarea']`).simulate('change', {
      target : { value : 'this is a test description' }
    });

    expect(wrapper.find(`[data-test='save-form-textarea']`).prop('value')).toBe('this is a test description');
    expect(wrapper.state('description')).toBe('this is a test description');
  });

  it('Should have a button with the text of Save Team', () => {
    expect(wrapper.find(`[data-test='save-form-submit']`).text()).toBe('Save Team');
  });

  it('Should close the modal when the back button is clicked', () => {
    wrapper.find(`[data-test='save-form-back']`).simulate('click');
    expect(toggleModal).toHaveBeenCalled();
  });

  it('Should successfully submit the form when a name and description are entered', () => {
    wrapper.find(`[data-test='save-form-input']`).simulate('change', {
      target : { value : 'test123' }
    });

    wrapper.find(`[data-test='save-form-textarea']`).simulate('change', {
      target : { value : 'this is a test description' }
    });

    wrapper.find(`[data-test='save-form-form']`).simulate('submit', {
      preventDefault : () => {}
    });

    expect(handleSaveTeam).toHaveBeenLastCalledWith('test123', 'this is a test description');
    expect(history.push).toHaveBeenLastCalledWith('/SavedTeams');
    expect(wrapper.state('error')).toBeFalsy();
    expect(wrapper.find(`[data-test='save-form-message']`).text()).toBe('Enter a name and description for your team.');
  });

  it('Should not submit the form when no team name is entered', () => {
    wrapper.find(`[data-test='save-form-input']`).simulate('change', {
      target : { value : '' }
    });

    wrapper.find(`[data-test='save-form-textarea']`).simulate('change', {
      target : { value : 'this is a test description' }
    });

    wrapper.find(`[data-test='save-form-form']`).simulate('submit', {
      preventDefault : () => {}
    });

    expect(handleSaveTeam).not.toHaveBeenCalled();
    expect(history.push).not.toHaveBeenCalled();
    expect(wrapper.state('error')).toBeTruthy();
    expect(wrapper.find(`[data-test='save-form-message']`).text()).toBe('Must enter a team name to save.');
  });
});

describe('The SavePokeTeamModal Component when team is being edited', () => {
  let wrapper, toggleModal, handleSaveTeam, history, type, pokeTeam;
  beforeEach(() => {
    handleSaveTeam = jest.fn();
    history = { push : jest.fn()};
    type = 'edit';
    toggleModal = jest.fn();
    pokeTeam = singlePokeTeam;

    const defaultProps = {
      handleSaveTeam,
      history,
      type,
      toggleModal,
      pokeTeam
    };
    wrapper = mount(<SavePokeTeamModal {...defaultProps} />);
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('Should render the component', () => {
    expect(wrapper.find(`[data-test='save-form-component']`).length).toBe(1);
  });

  it('Should set the name and description state when PokeTeam is being edited/provided as props', () => {
    expect(wrapper.state('name')).toBe(singlePokeTeam.name);
    expect(wrapper.state('description')).toBe(singlePokeTeam.description);
  });

  it('Should render the submit button with the correct text', () => {
    expect(wrapper.find(`[data-test='save-form-submit']`).text()).toBe('Edit Team');
  })
});
