import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 10px;
`;

export const Heading = styled.div`
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  h3,
  button {
    color: ${(props) => props.theme.colors.shadyLady};
    float: left;
  }
  h3 {
    padding-top: 20px;
    margin-left: 10px;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

export const ChannelsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  li {
    &.selected {
      background-color: ${(props) => props.theme.colors.toryBlue};
      &:hover,
      &:active,
      &:visited {
        background-color: ${(props) => props.theme.colors.toryBlue};
      }
      button {
        &:hover,
        &:active,
        &:visited {
          background-color: ${(props) => props.theme.colors.toryBlue};
        }
      }
    }
    margin-left: 0;
    padding-left: 0;
    button {
      color: ${(props) => props.theme.colors.shadyLady};
      font-size: 1em;
    }

    ${(props) => props.theme.mixins.clearfix()}
  }
`;
