import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import customTheme from './components/theme/theme.json';
import { createMuiTheme } from '@material-ui/core/styles';
import PrimaryAppBar from './components/navigation/PrimaryAppBar';
import BottomNav from './components/navigation/BottomNav';
import Dashboard from './components/utils/Dashboard.js';
import Visualization from './components/utils/Visualization.js';
import Funds from './components/funds/Funds.js';

const theme = createMuiTheme(customTheme);

const App = () => {
  let routes;


  routes = (
    <Switch>
      <Route path="/" exact>
          <Dashboard />
      </Route>
      <Route path="/funds">
          <Funds />
      </Route>
      <Route path="/visual">
          <Visualization />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <PrimaryAppBar />
            <div style={{ backgroundColor: "#d3d3d3", minHeight: "100vh" }}>
              {routes}
            </div>
          <BottomNav />
        </Router>
    </ThemeProvider>
  );
}

export default App;
