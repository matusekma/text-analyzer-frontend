import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

const AuthenticatedApp = () => {
  const location = useLocation();
  const referrer = (location.state as any)?.referrer;
  return <div>asd</div> ;
  /*
  return (
   
            <Switch>
              <Route path="/about">
                asd
              </Route>
              <Route path="/users">
                users
              </Route>
              {referrer && (
        <Route path="*" component={<Redirect to={referrer}  />} />
      )}
            </Switch>
        
      );
    <Routes basename={process.env.PUBLIC_URL}>
      {referrer && (
        <Route path="*" element={<Navigate to={referrer} replace />} />
      )}

      <Route path="plc" element={<PlcList />} />
      <Route path="plc/:plcId/*" element={<PlcDetailsPage />} />
      <Route path="plc-routiner/:plcId" element={<PlcRoutinerPage />} />
      <Route path="*" element={<Navigate to="plc" />} />
    </Routes>
  );*/
};

export default AuthenticatedApp;
