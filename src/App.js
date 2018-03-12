import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { injectGlobal } from 'emotion';
// import styled from 'react-emotion';

import AuthorPage from './pages/AuthorPage';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

import Card from './components/Card';
import Text from './components/Text';
import HorizontalBar from './components/HorizontalBar';
let BigFile;
// import BigFile from './components/BigFile';

import reset from './reset';

reset();

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    background-color: hsl(190, 5%, 96%);
    font-family: Helvetica,Arial,sans-serif;
  }
`;

function onMount() {
  return import(/* webpackChunkName: "bigfile" */ './components/BigFile').then(
    _module => {
      BigFile = _module.default;
    }
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRendered: undefined
    };
  }
  componentDidMount() {
    this.updateTimeRendered();
    onMount().then(() => this.forceUpdate());
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
        <Card>
          <HorizontalBar>
            <Text>
              <Link to="/">Home</Link>
            </Text>
            <Text>
              <Link to="/author/:id">Author</Link>
            </Text>
            <Text>
              <Link to="/book/:id">Book</Link>
            </Text>
          </HorizontalBar>
        </Card>
        {this.state.timeRendered && (
          <Card transparent>
            <br />
            <Text>{this.state.timeRendered}</Text>
          </Card>
        )}
        {BigFile && <BigFile />}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/author/:id" component={AuthorPage} />
          <Route path="/book/:id" component={BookPage} />
        </Switch>
      </div>
    );
  }
}
