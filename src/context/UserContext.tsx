import React, { ReactElement, useRef } from "react";
import {
  loginCall,
  logoutCall,
  getCurrentUserCall,
} from "../apiCalls/authApiCalls";
import { LoginResponse, UserResponse } from "../client";

interface UserContextProps {
  user: UserResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const UserContext = React.createContext<UserContextProps>({
  user: null,
  loading: false,
  login: () => new Promise(() => {}),
  logout: () => {},
});

type UserProviderProps = { children: React.ReactNode };

interface UserState {
  user: UserResponse | null;
  loading: boolean;
}

export const UserProvider = ({
  children,
}: UserProviderProps): ReactElement<UserContextProps> => {
  const isMounted = useRef(false);
  const [data, setUser] = React.useState<UserState>({
    user: null,
    loading: true,
  });

  const getCurrentUser = async () => {
    try {
      const userData = await getCurrentUserCall();
      // Only set the user if the component is still mounted
      if (isMounted.current) {
        setUser({ user: userData, loading: false });
      }
    } catch {
      if (isMounted.current) {
        setUser({ user: null, loading: false });
      }
    }
  };

  React.useEffect(() => {
    isMounted.current = true;

    getCurrentUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const loginResponse = await loginCall({ email, password });
    await getCurrentUser();
    return loginResponse;
  };

  const logout = async () => {
    await logoutCall();
    setUser({ user: null, loading: false });
  };

  const contextValue = {
    ...data,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => React.useContext(UserContext);
