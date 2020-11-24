import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 10%;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ModalContent = styled.div`
  height: 400px;
  overflow: scroll-y;
  width: 500px;
  svg {
    font-size: inherit;
  }
`;

export const ListContent = styled.ul`
  list-style-type: none;
  li {
    margin-bottom: 10px;
    svg {
      color: ${(props) => props.theme.colors.jungleGreen};
      font-size: 0.85em;
      margin-right: 5px;
    }
  }
`;
