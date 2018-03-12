import React from 'react';

const pageName = 'Home Page';
export default function HomePage() {
  return <div>
    <h1>{pageName}</h1>
    <div>This is the {pageName.toLowerCase()}</div>
  </div>
}
