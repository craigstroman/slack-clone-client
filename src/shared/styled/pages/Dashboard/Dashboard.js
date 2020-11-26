import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr;
  aside {
    display: grid;
    grid-template-columns: 250px;
  }
  main {
    display: grid;
  }
`;

export const SidebarWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.valentino};
  grid-column: 1;
`;

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  header {
    grid-column: 1;
    grid-row: 1;
  }
  section {
    border-bottom: 1px solid ${(props) => props.theme.colors.black};
    border-top: 1px solid ${(props) => props.theme.colors.black};
    grid-column: 1;
    grid-row: 2;
  }
  footer {
    grid-column: 1;
    grid-row: 3;
  }
`;

export const Messages = styled.div`
  height: 98%;
`;
