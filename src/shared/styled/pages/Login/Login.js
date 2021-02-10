import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const Header = styled.header`
  h1 {
    text-align: center;
  }
`;

export const Content = styled.main`
  margin: 0 auto;
  width: 100%;
  .row {
    margin: 0 auto;
    div {
      margin: 0 auto;
      text-align: center;
    }
  }
  form {
    margin: 0 auto;
    text-align: center;
    z-index: 0;
    .row {
      margin: 15px auto 15px auto;
      div {
        margin: 0 auto;
        input[type='text'],
        input[type='password'] {
          padding-right: 44px;
          &.is-invalid {
            background-image: none;
          }
        }
        .invalid-feedback {
          text-align: left;
        }
      }
    }
  }
`;

export const InputIcon = styled.div`
  position: relative;
  button {
    @extend .btn .btn-link;
    background: transparent;
    border: 0;
    outline: none;
    position: absolute;
    right: 0;
    top: 5px;
    &:focus,
    &:active {
      outline: none;
    }
  }
`;
