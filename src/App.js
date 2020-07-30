import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import Routes from "./routes";
import store from "./store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./App.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#868686",
    },
    secondary: {
      main: "#007bb2",
    },
  },
});

const history = createBrowserHistory();

const App = () => {
  const handleRouteUpdate = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history} onUpdate={handleRouteUpdate}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
