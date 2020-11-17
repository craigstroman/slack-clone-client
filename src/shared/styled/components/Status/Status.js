import styled from 'styled-components';

export const OfflineIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  svg {
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: 50%;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const OnlineIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  svg {
    background-color: ${(props) => props.theme.colors.jungleGreen};
    border: 1px solid ${(props) => props.theme.colors.jungleGreen};
    border-radius: 50%;
    color: ${(props) => props.theme.colors.jungleGreen};
  }
`;
