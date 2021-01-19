import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column-reverse;
  height: 86vh;
  overflow-y: scroll;
  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    li {
      margin-bottom: 10px;
      padding-left: 10px;
    }
  }
`;
export const MessageHeader = styled.header`
  display: block;
  width: 100%;
  h3 {
    display: inline-block;
    font-weight: bold;
    margin-right: 20px;
    text-align: left;
  }
  div {
    color: ${(props) => props.theme.colors.scorpion};
    display: inline-block;
    font-size: 0.875em;
  }
`;

export const Message = styled.div`
  display: block;
  text-align: left;
  width: 100%;
`;
