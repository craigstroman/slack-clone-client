import styled from 'styled-components';

const Wrapper = styled.div`
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
`;

export default Wrapper;
