import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export const Content = styled.div`
  header {
    margin: 0 auto;
    h1 {
      text-align: center;
    }
  }
  margin: 0 auto;
  width: 100%;
  form {
    margin: 0 auto;
    text-align: center;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    text-align: left;
    width: 500px;
  }
`;
