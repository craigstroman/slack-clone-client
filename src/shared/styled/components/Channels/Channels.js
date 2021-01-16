import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 10px;
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
