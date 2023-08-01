import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

const RootLayout = () => {
  return (
    <main className={styles.root}>
      <SideNavigation expand="right">
        <SideNavigationLink to="/events">
          <CalendarDaysIcon width="24px"/> <span>Events</span>
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
    </main>
  );
};

export default RootLayout;
