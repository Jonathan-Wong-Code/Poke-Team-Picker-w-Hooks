import React from 'react';
import { shallow } from 'enzyme';
import PokeTeamList from './../../components/PokeTeamList';
import pokeTeam from './../fixtures/pokeTeam';

describe("the PokeTeamList component", () => {
  let wrapper;

  beforeEach(() => {
    const defaultProps = {
      pokeTeam : Object.values(pokeTeam)
    };

    wrapper = shallow(<PokeTeamList {...defaultProps} />);
  });

  it('Should render the Poke Team List Component', () => {
    expect(wrapper.find(`[data-test='poke-team-list-component']`).length).toBe(1);
  });

  it('Should render the correct amount of Poke Team List Items', () => {
    expect(wrapper.find(`[data-test='poke-team-list-item']`).length).toBe(3);
  });

  it('Should not render the Poke Team List Items if there are no pokemon in the team', () => {
    wrapper.setProps({
      pokeTeam : []
    });
    expect(wrapper.find(`[data-test='poke-team-list-item']`).length).toBe(0);
  });
});
