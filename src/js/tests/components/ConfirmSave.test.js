
import React from 'react';
import { mount } from 'enzyme';
import pokemon from './../fixtures/pokemon';
import { ConfirmSave } from './../../components/ConfirmSave';

describe("The unconnected ConfirmSave component", () => {
  let wrapper, handleToggleSaveModal;

  beforeEach(() => {
    handleToggleSaveModal = jest.fn();
    const defaultProps = {
      handleToggleSaveModal,
      pokemon
    };
    wrapper = mount(<ConfirmSave {...defaultProps} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render a snapshot of the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the ConfirmSave component', () => {
    expect(wrapper.find(`[data-test='confirm-save-component']`).length).toBe(1);
  });

  it('Should render the correct text in the box', () => {
    expect(wrapper.find(`[data-test='confirm-save-text']`).text()).toEqual(`Saved ${pokemon.name}`);
  });

  it('Should close the modal when you click on the background', () => {
    wrapper.find(`[data-test='confirm-save-component']`).simulate('click');
    expect(handleToggleSaveModal).toHaveBeenCalled();
  });

  it('Should close the modal when you click on the close button', () => {
    wrapper.find(`[data-test='confirm-save-close-btn']`).simulate('click');
    expect(handleToggleSaveModal).toHaveBeenCalled();
  });

  it('Should not close the modal when you click on the body', () => {
    wrapper.find(`[data-test='confirm-save-body']`).simulate('click');
    expect(handleToggleSaveModal).not.toHaveBeenCalled();
  });
});
