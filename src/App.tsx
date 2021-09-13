import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PrivateRoute from "./routing/PrivateRoute";
import UploadTextPage from "./pages/upload-text/UploadTextPage";
import NotFoundPage from "./pages/generic/NotFoundPage";
import theme from "./theme";
import UploadAudioPage from "./pages/upload-audio/UploadAudioPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    {/*<Interceptor />*/}
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          home
        </PrivateRoute>
        <Route path="/login">login</Route>
        <PrivateRoute path="/upload-text">
          <UploadTextPage />
        </PrivateRoute>
        <PrivateRoute path="/upload-audio">
          <UploadAudioPage />
        </PrivateRoute>
        <PrivateRoute path="/my-uploads">my uploads page</PrivateRoute>
        <PrivateRoute path="/analysis-history">
          analysis history page
        </PrivateRoute>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
);
