import { Link } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  h1 {
    text-align: center;
  }
  .MuiGrid-container {
    margin: 0 auto;
    text-align: center;
  }
`;
export const StyledDialog = styled(Dialog)`
  .MuiDialogTitle-root {
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 1rem;
  }
  .MuiDialogActions-root {
    border-top: 1px solid #dee2e6;
    margin-top: 1rem;
  }
`;

export const StyledList = styled.ul`
  list-style-type: none;
`;

export const StyledTextLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
  }
`;
e;
