import { Link } from 'react-router-dom';
import { Menu } from '@material-ui/core';
import styled from 'styled-components';

export const StyledTextLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    top: 83px !important;
  }
`;
