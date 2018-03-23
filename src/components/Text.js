import styled from 'react-emotion';

export default styled('div')(
  {
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '24px',
    wordSpacing: '2px',
    paddingBottom: '6px'
  },
  ({ large }) =>
    large && {
      fontSize: '18px'
    },
  ({ heading }) =>
    heading && {
      fontSize: '28px',
      fontWeight: '500',
      lineHeight: '30px',
      paddingBottom: '12px',
      wordSpacing: '0px'
    },
  ({ subheading }) =>
    subheading && {
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '30px',
      paddingBottom: '12px',
      wordSpacing: '0px'
    }
);
