import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Wrapper from '../../../shared/styled/pages/Teams/NoTeams/NotTeams';
import PopUpMenu from '../../../components/PopUpMenu/PopUpMenu';

const NoTeams = (props) => (
  <Wrapper>
    <header>
      <Row>
        <Col md={12} className="header-text">
          <h1>Slack Clone - Create A Team</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pop-up-menu">
          <PopUpMenu />
        </Col>
      </Row>
    </header>
    <main>
      <Row>
        <Col md={12}>
          You have no teams. &nbsp; You either need to <a href="/create-team">create a team</a>&nbsp; or be
          invited to one.
        </Col>
      </Row>
    </main>
  </Wrapper>
);

export default NoTeams;
