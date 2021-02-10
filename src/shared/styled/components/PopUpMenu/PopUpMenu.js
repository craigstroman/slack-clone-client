import styled from 'styled-components';

const Wrapper = styled.div`
  .dropdown {
    .dropdown-toggle {
      background: transparent !important;
      border: 1px solid transparent;
      box-shadow: none !important;
      outline: none;
      &:focus,
      &:hover,
      &:active,
      &:visited {
        background: transparent !important;
        border: 1px solid transparent !important;
        box-shadow: none !important;
        outline: none;
      }
      &:after {
        content: none;
      }
    }
  }
  .dropdown-menu {
    .dropdown-item {
      .btn {
        color: ${(props) => props.theme.colors.black};
        &:hover,
        &:active,
        &:visited,
        &:focus {
          color: ${(props) => props.theme.colors.black};
        }
      }
    }
  }

  .user-icon {
    background-color: ${(props) => props.theme.colors.treePoppy};
    border-radius: 50%;
    color: ${(props) => props.theme.colors.white};
    line-height: 50px;
    text-align: center;
    font-size: 1.5em;
    height: 50px;
    width: 50px;
  }
`;

export default Wrapper;
