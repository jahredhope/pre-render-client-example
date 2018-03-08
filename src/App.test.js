import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

jest.useFakeTimers();

describe('App', () => {
  it('should render', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
