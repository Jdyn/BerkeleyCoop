import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { UserProvider } from "../../hooks/useUser";
import { memo } from "react";

const RootLayout = memo(() => {
  return (
    <main className={styles.root}>
      <UserProvider>
        <SideNavigation expand="right">
          <SideNavigationLink to="/events">
            <CalendarDaysIcon width="24px" />Events
          </SideNavigationLink>
          <SideNavigationLink to="/chats">
            <ChatBubbleBottomCenterIcon width="24px" />Chats
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
});

export default RootLayout;
