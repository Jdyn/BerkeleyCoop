/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { User } from "../api/account/types";

const loadUser = (): User | null => {
  const user = Cookies.get("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  return <UserContext.Provider value={loadUser()}>{children}</UserContext.Provider>;
};
