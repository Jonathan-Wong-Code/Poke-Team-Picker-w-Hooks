import React from 'react';
import {LoginPage} from './../../components/LoginPage';
import { shallow } from 'enzyme';
import regeneratorRuntime from 'regenerator-runtime';

describe("the connected login page", () => {
  let wrapper, history, startLogin, loginGuest;

  beforeEach(() => {
    history = { push : jest.fn() };
    startLogin = jest.fn();
    loginGuest = jest.fn();
    const defaultProps = {
      history,
      startLogin,
      loginGuest
    }
    wrapper = shallow(
      <LoginPage {...defaultProps} />
    );
  });
  
  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('Should render the login component', () => {
    expect(wrapper.find(`[data-test='login-component']`).length).toBe(1);
  });

  it('Should log the user in on login button click', () => {
    wrapper.find(`[data-test='login-button']`).simulate('click');
    expect(startLogin).toHaveBeenCalled();
  });

  it('Should log the user in as a guest on login guest click and redirect to /create', () => {
    wrapper.find(`[data-test='login-guest-button']`).simulate('click');
    expect(loginGuest).toHaveBeenCalled();
    expect(history.push).toHaveBeenLastCalledWith('/create')
  });
});
