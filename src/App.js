import React, { Component } from 'react';

import { injectGlobal } from 'emotion';
// import styled from 'react-emotion';

import Card from './components/Card';
import Text from './components/Text';

import reset from './reset';

reset();

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    background-color: hsl(190, 5%, 96%);
    font-family: Helvetica,Arial,sans-serif;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRendered: undefined
    };
  }
  componentDidMount() {
    this.updateTimeRendered();
  }
  updateTimeRendered = () => {
    this.setState({
      timeRendered: new Date().toString()
    });
    setTimeout(this.updateTimeRendered, 1000);
  };
  render() {
    return (
      <div>
        <Card>
          <Text heading>Base Application</Text>
          <Text>A simple boilerplate application</Text>
        </Card>
        {this.state.timeRendered && (
          <Card transparent>
            <br />
            <Text>{this.state.timeRendered}</Text>
          </Card>
        )}
      </div>
    );
  }
}
