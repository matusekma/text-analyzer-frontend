import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import SidebarWithHeader from "../components/menu/SidebarWithHeader";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({
  children,
  ...rest
}: RouteProps | { children: ReactNode }) => {
  const { user, loading } = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user && !loading ? (
          <Redirect
            to={{ pathname: "/login", state: { from: location } }}
          />
        ) : (
          <SidebarWithHeader>{children}</SidebarWithHeader>
        )
      }
    />
  );
};

export default PrivateRoute;
