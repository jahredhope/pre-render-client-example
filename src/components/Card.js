import styled from 'react-emotion';

export default styled('div')(
  {
    padding: '18px 18px 0'
  },
  ({ transparent }) => !transparent && { backgroundColor: 'hsl(0, 0%, 100%)' }
);
