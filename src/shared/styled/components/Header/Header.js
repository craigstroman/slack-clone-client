import styled from 'styled-components';
import { Dialog } from '@material-ui/core';

export const Wrapper = styled.div`
  height: 10%;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ListContent = styled.ul`
  list-style-type: none;
  li {
    margin-bottom: 10px;
    svg {
      color: ${(props) => props.theme.colors.jungleGreen};
      font-size: 0.85em;
      margin-right: 5px;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  height: 400px;
  margin: 0 auto;
  overflow: scroll-y;
  width: 500px;
  .MuiDialogTitle-root {
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 1rem;
  }
  .MuiDialogActions-root {
    border-top: 1px solid #dee2e6;
    margin-top: 1rem;
  }
`;
