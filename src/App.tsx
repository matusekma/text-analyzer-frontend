import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PrivateRoute from "./routing/PrivateRoute";
import UploadTextPage from "./pages/upload-text/UploadTextPage";
import NotFoundPage from "./pages/generic/NotFoundPage";
import theme from "./theme";
import UploadAudioPage from "./pages/upload-audio/UploadAudioPage";
import LoginOrRegisterPage from "./pages/auth/LoginOrRegisterPage";
import MyUploadsPage from "./pages/my-uploads/MyUploadsPage";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import EditUploadPage from "./pages/edit-upload/EditUploadPage";
import AnalysisPage from "./pages/analysis/AnalysisPage";
import PipelinesPage from "./pages/pipeline-history/PipelinesPage";
import PipelineResultsPage from "./pages/pipeline-results/PipelineResultsPage";
import JobResultPage from "./pages/job-result/JobResultPage";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <UserProvider>
        {/*<Interceptor />*/}
        <Router>
          <Switch>
            <Route path="/login">
              <LoginOrRegisterPage />
            </Route>
            <PrivateRoute exact path="/">
              home
            </PrivateRoute>
            <PrivateRoute path="/upload-text">
              <UploadTextPage />
            </PrivateRoute>
            <PrivateRoute path="/upload-audio">
              <UploadAudioPage />
            </PrivateRoute>
            <PrivateRoute path="/my-uploads">
              <MyUploadsPage />
            </PrivateRoute>
            <PrivateRoute path="/edit-upload/:uploadId">
              <EditUploadPage />
            </PrivateRoute>
            <PrivateRoute path="/analysis/:uploadId">
              <AnalysisPage />
            </PrivateRoute>
            <PrivateRoute path="/pipeline-history">
              <PipelinesPage />
            </PrivateRoute>
            <PrivateRoute path="/pipeline-results">
              <PipelineResultsPage />
            </PrivateRoute>
            <PrivateRoute path="/job-result">
              <JobResultPage />
            </PrivateRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
