import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  root: {
    marginLeft: 20,
  },
};

const StyledButton = styled(Button)`
  background-image: linear-gradient(
    90deg,
    rgb(3, 227, 150) 0%,
    rgb(3, 227, 150) 51%,
    rgb(3, 227, 150) 100%
  );
  background: linear-gradient(90deg, #03e396 0%, #03e396 51%, #03e396 100%);
  background-size: 200% auto;
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  transition: all 0.4s ease 0s;
  margin-top: 20px;
`;

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    style={{ marginLeft: '20px', color: 'white', marginTop: '-5px' }}
    size={20}
  />
));

export default function GradientButton(props) {
  const { children, isLoading, ...rest } = props;
  if (isLoading) {
    console.log('isLoading', isLoading);
    // delete props.isLoading;
  }
  return (
    <StyledButton {...props}>
      {children}
      {isLoading && <SpinnerAdornment {...rest} />}
    </StyledButton>
  );
}
