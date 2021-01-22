import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  header {
    h1 {
      text-align: center;
    }
  }
  main {
    margin: 0 auto;
    text-align: center;
  }
`;

const NoTeams = (props) => (
  <Wrapper>
    <header>
      <Row>
        <Col md={12}>
          <h1>Slack Clone - No Teams</h1>
          <hr />
        </Col>
      </Row>
    </header>
    <main>
      <Row>
        <Col md={12}>
          <PopUpMenu />
        </Col>
        <Col md={12}>
          You have no teams. &nbsp; You either need to <a href="/create-team">create a team</a>&nbsp; or be
          invited to one.
        </Col>
      </Row>
    </main>
  </Wrapper>
);

export default NoTeams;
