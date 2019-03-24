import { mount } from 'enzyme';
import React from 'react';
import { Modal } from './../../components/Modal';
import pokemon from './../fixtures/pokemon';

describe('the unconnected modal component with no error', () => {
  let wrapper, error, handleTogglePokeModal, handleAddPokemon;

  beforeEach(() => {
    error = null;
    handleTogglePokeModal = jest.fn();
    handleAddPokemon = jest.fn();

    const defaultProps = {
      error,
      handleTogglePokeModal,
      handleAddPokemon,
      pokemon
    };

    wrapper = mount(<Modal {...defaultProps} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the modal component', () => {
    expect(wrapper.find(`[data-test='modal-component']`).length).toBe(1);
  });

  it('Should close the Modal when the user clicks on the background', () => {
    wrapper.find(`[data-test='modal-component']`).simulate('click');
    expect(handleTogglePokeModal).toHaveBeenCalled();
  });

  it('Should not close the modal when the modal body is clicked', () => {
    wrapper.find(`[data-test='modal-body']`).simulate('click');
    expect(handleTogglePokeModal).not.toHaveBeenCalled();
  });

  it('Should close the Modal when the user clicks the Cancel button', () => {
    wrapper.find(`[data-test='modal-cancel']`).simulate('click');
    expect(handleTogglePokeModal).toHaveBeenCalled();
  });

  it('Should have the correct src and alt tags on the img element', () => {
    const img = wrapper.find(`[data-test='modal-img']`);
    expect(img.prop('src')).toEqual(pokemon.sprites.front_default);
    expect(img.prop('alt')).toEqual(pokemon.name);
  });

  it('Should render the correct pokemon name', () =>{
    expect(wrapper.find(`[data-test='modal-name']`).text()).toBe(pokemon.name);
  });

  it('Should render the correct pokemon nubmer of types and type names', () => {
    expect(wrapper.find(`[data-test='modal-type']`).length).toBe(1);
    expect(wrapper.find(`[data-test='modal-type']`).text()).toContain(pokemon.types[0].type.name);
  });

  it('Should render the correct number of stats and their names', () => {
    const modalStat = wrapper.find(`[data-test='modal-stat']`);
    expect(modalStat.length).toBe(6);
    expect(modalStat.at(0).text())
      .toBe(`${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat}`);

    expect(modalStat.at(1).text())
      .toBe(`${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}`);

    expect(modalStat.at(2).text())
      .toBe(`${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat}`);

    expect(modalStat.at(3).text())
      .toBe(`${pokemon.stats[3].stat.name}: ${pokemon.stats[3].base_stat}`);

    expect(modalStat.at(4).text())
      .toBe(`${pokemon.stats[4].stat.name}: ${pokemon.stats[4].base_stat}`);

    expect(modalStat.at(5).text())
      .toBe(`${pokemon.stats[5].stat.name}: ${pokemon.stats[5].base_stat}`);
  });

  it('Should render the correct number of abilities and their names', () => {
    const modalAbility = wrapper.find(`[data-test='modal-ability']`);
    expect(modalAbility.length).toBe(2);
    expect(modalAbility.at(0).text()).toBe(pokemon.abilities[0].ability.name);
    expect(modalAbility.at(1).text()).toBe(pokemon.abilities[1].ability.name);
  });

  it('Should save the Pokemon when the save button is clicked', () => {
    wrapper.find(`[data-test='modal-save']`).simulate('click');
    expect(handleAddPokemon).toHaveBeenCalled();
  });
});
