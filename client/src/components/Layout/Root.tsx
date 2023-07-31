import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Headers from "../Header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className={styles.root}>
      <SideNavigation expand="right">
        <SideNavigationLink to="/events">Events</SideNavigationLink>
        <SideNavigationLink to="/rooms">Rooms</SideNavigationLink>
      </SideNavigation>
      <div className={styles.wrapper}>
        <Headers />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
