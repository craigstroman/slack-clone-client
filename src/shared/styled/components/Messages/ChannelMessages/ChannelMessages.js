import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column-reverse;
  height: 86vh;
  overflow-y: scroll;
  position: relative;
  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    position: relative;
    li {
      margin-bottom: 10px;
      padding-left: 10px;
      position: relative;
    }
  }
`;
export const MessageHeader = styled.header`
  display: block;
  height: 50px;
  position: relative;
  width: 100%;
  h3,
  .message-date-time {
    display: inline-block;
    position: relative;
    z-index: 0;
  }

  .message-date-time {
    margin-left: 20px;
  }

  h3,
  .btn,
  .btn-link {
    background-image: none;
    color: ${(props) => props.theme.colors.black};
    outline: 0;
    box-shadow: none;
    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
    }
    &:hover,
    &:active,
    &:focus,
    &:visited {
      background-image: none;
      color: ${(props) => props.theme.colors.black};
      outline: 0;
      box-shadow: none;
    }
  }
`;

export const Message = styled.div`
  display: block;
  text-align: left;
  width: 100%;
`;
