import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { useGetAccountQuery } from "../../api/account/account";
import { useEffect } from "react";
import { UserProvider } from "../../hooks/useUser";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isError, error } = useGetAccountQuery();

  useEffect(() => {
    if (isError && !(error?.status === "FETCH_ERROR")) {
      navigate("/signin");
    }
  }, [isError, error, navigate]);

  return (
    <main className={styles.root}>
      <UserProvider>
        <SideNavigation expand="right">
          <SideNavigationLink to="/events">
            <CalendarDaysIcon width="24px" /> <span>Events</span>
          </SideNavigationLink>
          <SideNavigationLink to="/chats">
            <ChatBubbleBottomCenterIcon width="24px" /> <span>Chats</span>
          </SideNavigationLink>
        </SideNavigation>
        <Header />
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
          </div>
        </div>
      </UserProvider>
    </main>
  );
};

export default RootLayout;
