import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { useRouterHistory, Router } from 'react-router';
import routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

import { createHistory } from 'history'

const history = useRouterHistory(createHistory)({
  basename: '/ar-contentportal'
})


ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={history} routes={routes}/>
  </MuiThemeProvider>), document.getElementById('react-app'));
