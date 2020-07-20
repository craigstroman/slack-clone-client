import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Register from '../Register/Register';
import Login from '../Login/Login';

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
            </Switch>
          </Grid>
        </Grid>
      </main>
    </BrowserRouter>
  </>
);

export default Home;
