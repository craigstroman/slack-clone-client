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

export const Invite = styled.section`
  color: ${(props) => props.theme.colors.shadyLady};
  display: block;
  height: 40px;
  width: 100%;
  h3,
  button {
    float: left;
  }

  h3 {
    margin-left: 10px;
    padding-top: 8px;
  }

  button {
    bottom: 13px;
    color: ${(props) => props.theme.colors.shadyLady};
    margin-left: 5px;
  }

  ${(props) => props.theme.mixins.clearfix()}
`;
