import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from './../../components/NavBar';
import { loginGuest } from '../../actions/auth';

describe("The unconnected NavBar component with non-guest account", () => {
  let wrapper, logout, history, startLogout, auth;
  beforeEach(() => {
    logout = jest.fn();
    history = { push : jest.fn() };
    startLogout = jest.fn();
    auth = 'test123';
    const defaultProps = {
      logout,
      history,
      startLogout,
      auth
    };
    wrapper = shallow(<NavBar {...defaultProps} />);
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the NavBar component', () => {
    expect(wrapper.find(`[data-test='nav-bar-component']`).length).toBe(1);
  });

  it('Should log the user out when logout clicked', () => {
    wrapper.find(`[data-test='nav-bar-logout']`).simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });

  it('Should log the user out of the guest account and redirected to home screen', () => {
    wrapper.setProps({
      auth : 'guest'
    });

    wrapper.find(`[data-test='nav-bar-logout']`).simulate('click');
    expect(logout).toHaveBeenCalled();
    expect(history.push).toHaveBeenLastCalledWith('/');
  });
});
