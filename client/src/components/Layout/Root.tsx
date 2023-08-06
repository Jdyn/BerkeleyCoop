import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import UserListCard from "../UserListCard/UserListCard";
import clsx from "clsx";
import { useChannel } from "../../hooks/socket/useChannel";
import useEvent from "../../hooks/socket/useEvent";
import { useState } from "react";
import { Presence } from "phoenix";

const RootLayout = () => {
  const channel = useChannel("room:lobby");
  const [members, setMembers] = useState<any[]>([]);

  const [{ presence, onlineList, offlineList }, setState] = useState<Record<string, any>>({
    presence: {},
    onlineList: [],
    offlineList: [],
  });

  useEvent(channel, "presence_diff", (message) => {
    if (Object.keys(presence).length === 0) return;

    const newPresence = Presence.syncDiff(presence, message);
    const [onlineList, offlineList] = consolidate(newPresence);

    setState({ presence: newPresence, onlineList, offlineList });
  });

  useEvent(channel, "presence_state", (message) => {
    // const newPresence = Presence.syncState(presence, message);
    const [onlineList, offlineList] = consolidate(message);

    setState({ presence: message, onlineList, offlineList });
  });

  useEvent(channel, "members", (message) => {
    setMembers(message.users);
  });

  const consolidate = (newPresence: any): [any[], any[]] => {
    const online: any[] = [];
    const offline: any[] = [];

    if (!members) return consolidate(newPresence);

    members.forEach((member) => {
      if (member.id in newPresence) {
        online.push({ ...member, onlineAt: newPresence[member.id].metas[0].onlineAt });
      } else {
        offline.push(member);
      }
    });

    return [online, offline];
  };

  // console.log(onlineList, offlineList);

  return (
    <main className={styles.root}>
      <SideNavigation expand="right" style={{ gridArea: "left" }}>
        <SideNavigationLink to="/events">
          <CalendarDaysIcon width="24px" />
          Events
        </SideNavigationLink>
        <SideNavigationLink to="/chats">
          <ChatBubbleBottomCenterIcon width="24px" />
          Chats
        </SideNavigationLink>
        <SideNavigationLink
          to="/signin"
          replace
          onClick={() => {
            // signOut();
          }}
          className={clsx(styles.listItem, styles.logout)}
          style={{ justifySelf: "flex-end" }}
        >
          <ArrowRightOnRectangleIcon width="24px" />
          Log out
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
      <SideNavigation expand="left" style={{ gridArea: "right" }}>
        <div className={styles.userList} style={{ flexGrow: 1 }}>
          <h3>Online</h3>
          {onlineList.map((user: any) => (
            <UserListCard key={user.id} user={user} online />
          ))}
        </div>
        <div className={styles.userList}>
          <h3>Offline</h3>
          {offlineList.map((user: any) => (
            <UserListCard key={user.id} user={user} />
          ))}
        </div>
      </SideNavigation>
    </main>
  );
};

export default RootLayout;
