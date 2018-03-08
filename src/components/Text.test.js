import React from 'react';
import Text from './Text';
import { shallow } from 'enzyme';

describe('Text', () => {
  it('should render body text', () => {
    expect(shallow(<Text>foo</Text>)).toMatchSnapshot();
  });
  it('should render heading', () => {
    expect(shallow(<Text heading>foo</Text>)).toMatchSnapshot();
  });
});
