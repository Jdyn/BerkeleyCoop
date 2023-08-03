import { PropsWithChildren, createContext, useContext } from "react";
import Cookies from "js-cookie";

const loadUser = () => {
  let user = Cookies.get("user");

  if (user) {
    user = JSON.parse(user);
    return user;
  }

  return null;
};

const UserContext = createContext<null | unknown>(loadUser());

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {

  return <UserContext.Provider value={useUser()}>{children}</UserContext.Provider>;
};
