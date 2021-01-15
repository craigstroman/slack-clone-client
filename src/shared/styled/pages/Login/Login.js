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
    .row {
      margin: 15px auto 15px auto;
      div {
        margin: 0 auto;
        .invalid-feedback {
          text-align: left;
        }
      }
    }
  }
`;
