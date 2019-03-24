import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import moment from 'moment';
import ConnectedSavedTeamsPage from '../../components/SavedTeamsPage';
import TestStore from '../testStore';
import pokeTeam from '../fixtures/pokeTeam';
import regeneratorRuntime from 'regenerator-runtime';

describe("The connected Saved Teams Page with pokeTeams saved", () => {
  let wrapper, initialState;
  beforeEach(() => {
    initialState = {
      savedTeams : pokeTeam
    };

    wrapper = mount(
      <TestStore initialState={initialState}>
        <MemoryRouter>
          <ConnectedSavedTeamsPage />
        </MemoryRouter>
      </TestStore> 
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper.find(`[data-test='saved-teams-component']`)).toMatchSnapshot();
  });

  it('Should render the Saved Teams Page component', () => {
    expect(wrapper.find(`[data-test='saved-teams-component']`).length).toBe(1);
  });

  //Saved Teams Page List

  it('Should render the saved teams list component', () => {
    expect(wrapper.find(`[data-test='saved-teams-list']`).length).toBe(1);
  });

  //SavedTeamsCell
  it('Should render the correct number of poke team cells', () => {
    expect(wrapper.find(`[data-test='saved-teams-cell']`).length).toBe(3);
  });

  it('Should render the Saved Teams Cell Component', () => {
    expect(wrapper.find(`[data-test='saved-teams-cell']`).length).toBe(3);
  });

  it('Should render the correct pokemon images', () => {
    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(0).prop('src')).toBe(pokeTeam.team1.pokemon[0].sprites.front_default);

    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(1).prop('src')).toBe(pokeTeam.team1.pokemon[1].sprites.front_default);

    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(2).prop('src')).toBe(pokeTeam.team1.pokemon[2].sprites.front_default);

    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(3).prop('src')).toBe(pokeTeam.team1.pokemon[3].sprites.front_default);

    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(4).prop('src')).toBe(pokeTeam.team1.pokemon[4].sprites.front_default);

    expect(wrapper.find(`[data-test='saved-team-cell-img']`).at(5).prop('src')).toBe(pokeTeam.team1.pokemon[5].sprites.front_default);
  });

  it('Should render the correct pokemon team name', () => {
    expect(wrapper.find(`[data-test='team-cell-name']`).at(0).text()).toBe(pokeTeam.team1.name);
  });

  it('Should render the correct pokemon team creation date', () => {
    expect(wrapper.find(`[data-test='team-cell-date']`).at(0).text()).toContain(moment(pokeTeam.team1.createdAt).format('MMM Do YYYY'));
  });
  
  it('Should render the correct pokemon team description', () => {
    expect(wrapper.find(`[data-test='team-cell-description']`).at(0).text()).toBe(pokeTeam.team1.description);
  });

  it('Should have a link that takes the user to the edit page', () => {
    expect(wrapper.find(`[data-test='team-cell-link']`).at(0).prop('to')).toBe(`/edit/${pokeTeam.team1.id}`);
  });
});

describe("The connected Saved Teams Page with no pokeTeams saved", () => {
  let wrapper, initialState;
  beforeEach(() => {
    initialState = {
      savedTeams : {}
    };

    wrapper = mount(
      <TestStore initialState={initialState}>
        <MemoryRouter>
          <ConnectedSavedTeamsPage />
        </MemoryRouter>
      </TestStore> 
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should not render the Saved Teams List and render the error', () => {
    expect(wrapper.find(`[data-test='saved-teams-list']`).length).toBe(0);
    expect(wrapper.find(`[data-test='saved-teams-error']`).length).toBe(1);
  });
});
