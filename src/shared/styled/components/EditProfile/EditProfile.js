import { Dialog, TextField } from '@material-ui/core';
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

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    text-align: left;
    width: 500px;
  }
`;
