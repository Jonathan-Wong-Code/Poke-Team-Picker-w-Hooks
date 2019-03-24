import React from 'react';
import { SavedTeamsCell } from './../../components/SavedTeamsCell';
import { shallow } from 'enzyme';
import { singlePokeTeam } from './../fixtures/pokeTeam';

describe(" The unconnected SavedTeams Cell Component", () => {
  let wrapper, deletePokeTeam;
  beforeEach(() => {
    deletePokeTeam = jest.fn();
    const defaultProps = {
      team : singlePokeTeam,
      deletePokeTeam
    };

    wrapper = shallow(<SavedTeamsCell {...defaultProps} />);
  });

  it('Should render the component', () => {
    expect(wrapper.find(`[data-test='saved-teams-cell']`).length).toBe(1);
  });

  it('Should delete the team when the delete button is clicked', () => {
    wrapper.find(`[data-test='team-cell-delete']`).simulate('click');
    expect(deletePokeTeam).toHaveBeenLastCalledWith(singlePokeTeam.id);
  });
});
