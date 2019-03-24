import React from 'react';
import { shallow } from 'enzyme';
import SavePokeTeamBtn from './../../components/SavePokeTeamBtn';
import pokemon from './../fixtures/pokemon';

describe('The SavePokeTeamBtn component with type of create and full team', () => {
  let wrapper, type, toggleModal, pokeTeam;
  beforeEach(() => {
    type = 'create';
    toggleModal = jest.fn();
    pokeTeam = [pokemon, pokemon, pokemon, pokemon, pokemon, pokemon];

    const defaultProps = {
      type,
      toggleModal,
      pokeTeam
    };

    wrapper = shallow(<SavePokeTeamBtn {...defaultProps} />);
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the component', () => {
    expect(wrapper.find(`[data-test='save-team-btn-component']`).length).toBe(1);
  });

  it('Should render the button when pokemon selected', () => {
    expect(wrapper.find(`[data-test='save-team-submit']`).length).toBe(1);
  });

  it('Should have a button that is not disabled', () => {
    expect(wrapper.find(`[data-test='save-team-submit']`).prop('disabled')).toBe(false);
  });

  it('Should be disabled if the team length is less than 6', () => {
    wrapper.setProps({ 
      pokeTeam : [pokemon]
    });

    expect(wrapper.find(`[data-test='save-team-submit']`).prop('disabled')).toBe(true);
  });

  it(`Should have a button with a text of 'Save Team' for type = 'create'`, () => {
    expect(wrapper.find(`[data-test='save-team-submit']`).text()).toBe('Save Team');
  });

  it(`Should have a button with a text of 'Edit Team' for type !== 'create'`, () => {
    wrapper.setProps({
      type : 'edit'
    });

    expect(wrapper.find(`[data-test='save-team-submit']`).text()).toBe('Edit Team');
  });

  it('Should open the Save Team modal when the button is clicked with a full team', () => {
    wrapper.find(`[data-test='save-team-submit']`).simulate('click');
    expect(toggleModal).toHaveBeenCalled();
  });

  it('Should render the correct number of chosen pokemon in the span', () => {
    expect(wrapper.find(`[data-test='save-team-current-num']`).text()).toContain('6/6');
  });

  it('Should not render the button when there are no pokemon in the team', () => {
    wrapper.setProps({
      pokeTeam : []
    });

    expect(wrapper.find(`[data-test='save-team-submit']`).length).toBe(0);
  });
});
