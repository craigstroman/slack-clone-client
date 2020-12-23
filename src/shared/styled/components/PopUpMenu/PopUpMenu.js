import { Menu } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  ul {
    top: 80px;
  }
`;

export const StyledMenu = styled(Menu)`
  top: 60px !important;
  .settings-menu__item {
    padding: 20px;

    button {
      background: none;
      color: ${(props) => props.theme.colors.black};
      text-transform: none;
      &:hover,
      &:focus,
      &:active {
        color: ${(props) => props.theme.colors.black};
        text-decoration: underline;
      }
    }
  }
`;
