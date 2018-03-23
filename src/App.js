import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import Loadable from 'react-loadable';
import styled from 'react-emotion';

const Loading = styled('div')({
  height: `${10 * 6}px`
});

// eslint-disable-next-line new-cap
const BigFile = Loadable({
  loader: () => import('./components/BigFile').then(_module => _module.default),
  loading: () => {}
});

import AuthorPage from './pages/AuthorPage';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

import Card from './components/Card';
import Text from './components/Text';
import HorizontalBar from './components/HorizontalBar';

import reset from './reset';

reset();

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    background-color: hsl(190, 5%, 96%);
    font-family: Helvetica,Arial,sans-serif;
  }
  h1 {
    font-size: unset;
    margin: unset;
    font-weight: unset;
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
        {this.state.timeRendered ? (
          <Card transparent>
            <br />
            <Text>{this.state.timeRendered}</Text>
          </Card>
        ) : <Loading />}
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
