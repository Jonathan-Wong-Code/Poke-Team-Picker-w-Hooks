import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import React from 'react';
import moxios from 'moxios';
import CreateTeamPage from './../../components/CreateTeamPage';
import pokeapi from './../../apis/pokeapi';
import TestStore from './../testStore';
import pokemon from './../fixtures/pokemon';

describe("The Create Team page component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <TestStore>
        <MemoryRouter>
          <CreateTeamPage />
        </MemoryRouter>
      </TestStore>
    );

    moxios.install(pokeapi);
  });

  afterEach(() => {
    moxios.uninstall(pokeapi);
    wrapper.unmount();
  });

  it('should render the BuildTeamPage', () => {
    expect(wrapper.find(`[data-test='build-team-component']`).length).toBe(1);
  });

  // it('Render the pokecards on load', () => {
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status : 200,
  //       response : [pokemon, pokemon, pokemon, pokemon]
  //     });
  //   });

  //   expect(wrapper.find(`[data-test='poke-card-item']`).length).toBe(4);
  // });
});
