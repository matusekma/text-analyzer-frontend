import React from "react";
import { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import SidebarWithHeader from "../components/menu/SidebarWithHeader";

const PrivateRoute = ({
  children,
  ...rest
}: RouteProps | { children: ReactNode }) => {
  let auth = { user: true }; // useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          <SidebarWithHeader>{children}</SidebarWithHeader>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
