import { shallow } from 'enzyme';
import React from 'react';
import { EditTeamPage } from './../../components/EditTeamPage';
import BuildPokeTeamPage from './../../components/BuildPokeTeamPage';

describe('The unconnected EditTeamPage component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EditTeamPage />);
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the BuildTeamPage component with proper type prop', () => {
    expect(wrapper.find(BuildPokeTeamPage).length).toBe(1);
    expect(wrapper.find(BuildPokeTeamPage).prop('type')).toBe('edit');
  });
});


