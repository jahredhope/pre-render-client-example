import React from 'react';
import Text from '../components/Text';
import Card from '../components/Card';

const pageName = 'Book Page';
export default function HomePage() {
  return <Card>
    <Text heading>{pageName}</Text>
    <Text>This is the {pageName.toLowerCase()}</Text>
  </Card>
}
