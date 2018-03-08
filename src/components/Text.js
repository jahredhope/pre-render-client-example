import styled from 'react-emotion';

export default styled('div')(
  {
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '24px',
    wordSpacing: '2px'
  },
  ({ heading }) =>
    heading && {
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '30px',
      marginBottom: '6px',
      wordSpacing: '0px'
    }
);
