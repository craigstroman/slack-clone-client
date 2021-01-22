import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  header {
    .row {
      margin-bottom: 10px;
      .header-text {
        h1 {
          text-align: center;
        }
      }
      .pop-up-menu {
        text-align: right;
        .dropdown {
          .dropdown-toggle {
            margin-right: 10px;
          }
        }
      }
    }
  }
  main {
    form {
      .row {
        margin-bottom: 10px;
        div {
          margin: 0 auto;
          text-align: center;
        }
      }
    }
  }
`;

export default Wrapper;
