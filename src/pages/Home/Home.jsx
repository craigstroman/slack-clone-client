import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import styled from 'styled-components';
import PrivateRoute from '../../shared/util/privateRoutes';
import Register from '../Register/Register';
import Login from '../Login/Login';
import CreateTeam from '../Teams/CreateTeam/CreateTeam';
import ViewTeam from '../Teams/ViewTeam/ViewTeam';

const Home = (props) => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <main>
        <Grid container spacing={3} justify="center">
          <Grid item lg={12} style={{ padding: '12 !important' }}>
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
          </Grid>
        </Grid>
      </main>
    </BrowserRouter>
  </>
);

export default Home;
