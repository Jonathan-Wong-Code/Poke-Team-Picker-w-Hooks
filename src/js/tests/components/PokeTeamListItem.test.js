import React from 'react';
import PokeTeamListItem from './../../components/PokeTeamListItem';
import { mount } from 'enzyme';
import pokemon from './../fixtures/pokemon';

describe('The PokeTeamListItem component', () => {
  let wrapper, handleRemovePokemon;
  beforeEach(() => {
    handleRemovePokemon = jest.fn();
    const defaultProps = {
      handleRemovePokemon,
      pokemon
    };
    wrapper = mount(<PokeTeamListItem {...defaultProps} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render the PokeTeamListItem component', () => {
    expect(wrapper.find(`[data-test='poke-team-list-item-component']`).length).toBe(1);
  });

  it('Should render the image with the correct img and alt attributes', () => {
    expect(wrapper.find(`[data-test='team-member-img']`).prop('src')).toBe(pokemon.sprites.front_default);
    expect(wrapper.find(`[data-test='team-member-img']`).prop('alt')).toBe(pokemon.name);
  });

  it('Should render the correct pokemon types', () => {
    expect(wrapper.find(`[data-test='team-member-types']`).text()).toContain(pokemon.types[0].type.name);
  }); 

  it('Should delete a pokemon when the button is clicked', () => {
    wrapper.find(`[data-test='team-member-delete']`).simulate('click');
    expect(handleRemovePokemon).toHaveBeenLastCalledWith(pokemon.uniqueId);
  });
});
