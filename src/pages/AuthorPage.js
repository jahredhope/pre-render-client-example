import React, { Component } from 'react';
import Text from '../components/Text';
import Card from '../components/Card';

import load from '../async/author';

const pageName = 'Author Page';
let AuthorImage;

function AuthorPage() {
  return (
    <div>
      <Text heading>
        <h1>{pageName}</h1>
      </Text>
      <Text>This is the {pageName.toLowerCase()}</Text>
      <AuthorImage />
    </div>
  );
}

export default class AuthorPageLoader extends Component {
  constructor(props) {
    super(props);
    const { image, imagePromise } = load();
    this.state = { isLoaded: false };
    if (image) {
      AuthorImage = image;
      this.state.isLoaded = true;
    } else {
      imagePromise.then(loadedImage => {
        AuthorImage = loadedImage;
        this.setState({ isLoaded: true });
      });
    }
  }
  render() {
    const props = this.props;

    if (!this.state.isLoaded) {
      return <Card transparent>loading...</Card>;
    }
    return <AuthorPage {...props} />;
  }
}
