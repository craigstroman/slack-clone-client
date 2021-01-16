import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 15px;
`;

export const Header = styled.header`
  margin-bottom: 20px;
  h2 {
    color: ${(props) => props.theme.colors.white};
    text-align: center;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

export const User = styled.div`
  margin: 0 auto;
  text-align: center;
  h3 {
    color: ${(props) => props.theme.colors.white};
    display: inline-block;
    text-align: center;
  }
  svg {
    color: ${(props) => props.theme.colors.jungleGreen};
    font-size: 0.85em;
    margin-right: 5px;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;

export const ChannelsBlock = styled.div`
  color: ${(props) => props.theme.colors.shadyLady};
  display: block;
  width: 100%;
  h5 {
    display: inline-block;
    margin-left: 5px;
  }

  button {
    bottom: 13px;
    color: ${(props) => props.theme.colors.shadyLady};
    display: inline-block;
    margin-left: 5px;
    &:active,
    &:visited,
    &:hover {
      color: ${(props) => props.theme.colors.shadyLady};
    }
  }
`;

export const InviteBlock = styled.div`
  color: ${(props) => props.theme.colors.shadyLady};
  display: block;
  width: 100%;

  h5 {
    display: inline-block;
    margin-left: 5px;
    padding-top: 8px;
  }

  button {
    bottom: 13px;
    color: ${(props) => props.theme.colors.shadyLady};
    display: inline-block;
    margin-left: 5px;
    &:active,
    &:visited,
    &:hover {
      color: ${(props) => props.theme.colors.shadyLady};
    }
  }

  ${(props) => props.theme.mixins.clearfix()}
`;
