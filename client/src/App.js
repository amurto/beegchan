import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';

import { ThemeProvider } from '@material-ui/styles';
import customTheme from './components/theme/theme.json';
import { createMuiTheme } from '@material-ui/core/styles';
import PrimaryAppBar from './components/navigation/PrimaryAppBar';
import BottomNav from './components/navigation/BottomNav';
import Dashboard from './components/utils/Dashboard.js';
import Landing from './components/utils/Landing.js';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';

const theme = createMuiTheme(customTheme);

const App = () => {
  const { token, login, logout, userId, userName } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Dashboard />
        </Route>
        <Route path="/visual">
            <div>hi</div>
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Landing />
        </Route>
        <Route path="/signin" exact>
            <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  // routes = (
  //   <Switch>
  //     <Route path="/" exact>
  //         <Dashboard />
  //     </Route>
  //     <Route path="/visual">
  //         <div>hi</div>
  //     </Route>
  //     <Redirect to="/" />
  //   </Switch>
  // )

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout
      }}
      >
         <Router>
          <PrimaryAppBar />
            <div style={{ backgroundColor: "#d3d3d3", minHeight: "100vh" }}>
              {routes}
            </div>
            {token && (
              <BottomNav />
            )}
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
