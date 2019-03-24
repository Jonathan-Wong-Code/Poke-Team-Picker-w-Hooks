import { shallow } from 'enzyme';
import React from 'react';
import { SearchBar } from './../../components/SearchBar';

describe("the Searchbar Component", () => {
  let handlePokeSearch, wrapper;
  beforeEach(() => {
    handlePokeSearch = jest.fn();
    wrapper = shallow(<SearchBar handlePokeSearch={handlePokeSearch} />);
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the SearchBar component', () => {
    expect(wrapper.find(`[data-test='search-bar-component']`).length).toBe(1);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should an input the user can type in', () => {
    wrapper.find(`[data-test='search-bar-input']`).simulate('change', {
      target : { value : 'test123' }
    });
   
    wrapper.update();
    
    expect(wrapper.find(`[data-test='search-bar-input']`).prop('value')).toEqual('test123');
    expect(wrapper.state('textFilter')).toEqual('test123');
  });

  it('Should have a select menu where the user can choose the pokemon type', () => {
    wrapper.find(`[data-test='search-bar-select']`).simulate('change', {
      target : { value : 'fire' }
    });

    expect(wrapper.find(`[data-test='search-bar-select']`).prop('value')).toBe('fire');
    expect(wrapper.state('type')).toBe('fire');
  });

  it('Should submit the form', () => {
    wrapper.find(`[data-test='search-bar-select']`).simulate('change', {
      target : { value : 'fire' }
    });

    wrapper.find(`[data-test='search-bar-input']`).simulate('change', {
      target : { value : 'test123' }
    });

    wrapper.find(`[data-test='search-bar-form']`).simulate('submit', {
      preventDefault : () => {}
    });
    expect(handlePokeSearch).toHaveBeenLastCalledWith('test123', 'fire');
  });
});
