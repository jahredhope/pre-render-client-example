import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Bar = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 6px;
`;

const Child = styled('div')`
  margin: 0 10px;
`;

export default function HorizontalBar({ children }) {
  return (
    <Bar>
      {children.map((child, index) => <Child key={index}>{child}</Child>)}
    </Bar>
  );
}

HorizontalBar.propTypes = {
  children: PropTypes.node.isRequired
}
