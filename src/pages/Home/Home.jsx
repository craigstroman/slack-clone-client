import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import PrivateRoute from '../../shared/util/privateRoutes';
import Register from '../Register/Register';
import Login from '../Login/Login';
import CreateTeam from '../Teams/CreateTeam/CreateTeam';
import ViewTeam from '../Teams/ViewTeam/ViewTeam';

const Home = (props) => (
  <>
    <Row>
      <Col md={12}>
        <BrowserRouter>
          <main>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <PrivateRoute path="/dashboard" exact component={ViewTeam} />
              <PrivateRoute path="/dashboard/view/team/:teamId?" exact component={ViewTeam} />
              <PrivateRoute
                path="/dashboard/view/team/:teamId?/channel/:channelId?"
                exact
                component={ViewTeam}
              />
              <PrivateRoute path="/create-team" exact component={CreateTeam} />
            </Switch>
          </main>
        </BrowserRouter>
      </Col>
    </Row>
  </>
);

export default Home;
