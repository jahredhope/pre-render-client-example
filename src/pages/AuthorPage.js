import React from 'react';
import Text from '../components/Text';
import Card from '../components/Card';

const pageName = 'Author Page';

import Loadable from 'react-loadable';

// eslint-disable-next-line new-cap
const LoadableComponent = Loadable({
  loader: () =>
    import('../components/AuthorImage').then(_module => _module.default),
  loading: () => (
    <Card transparent>
      <Text>loading...</Text>
    </Card>
  )
});

export default function AuthorPage() {
  return (
    <Card>
      <Text heading>
        <h1>{pageName}</h1>
      </Text>
      <Text>This is the {pageName.toLowerCase()}</Text>
      <LoadableComponent />
    </Card>
  );
}
