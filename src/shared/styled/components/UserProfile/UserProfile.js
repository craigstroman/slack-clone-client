import { Popover } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPopOver = styled(Popover)`
  height: 300px;
  width: 400px;
  .arrow {
    visibility: hidden;
  }
  header {
    margin: 0 auto 10px auto;
    text-align: center;
    svg {
      color: ${(props) => props.theme.colors.treePoppy};
    }
  }
  main {
    padding-left: 10px;
    text-align: left;
    .user-name {
      h3 {
        display: inline-block;
      }
    }
    .user-email {
      h5 {
        a {
          color: ${(props) => props.theme.colors.black};
          text-decoration: none;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            text-decoration: underline;
          }
        }
      }
    }
  }
  footer {
    margin-top: 20px;
    padding-left: 10px;
  }
`;

export default StyledPopOver;
