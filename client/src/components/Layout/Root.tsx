import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon, ChatBubbleBottomCenterIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import UserListCard from "../UserListCard/UserListCard";
import clsx from "clsx";
import { useChannel } from "../../hooks/socket/useChannel";
import useEvent from "../../hooks/socket/useEvent";
import { useState } from "react";
import { Presence } from "phoenix";

const RootLayout = () => {
  const channel = useChannel("room:lobby");
  const [members, setMembers] = useState<any[]>([]);

  const [{ presence, userList }, setState] = useState<Record<string, any>>({
    presence: {},
    userList: []
  });

  useEvent(channel, "presence_diff", (message) => {
    if (Object.keys(presence).length === 0) return;

    const newPresence = Presence.syncDiff(presence, message);
    const [onlineList, offlineList] = consolidate(newPresence);

    setState({ presence: newPresence, onlineList, offlineList });
  });

  useEvent(channel, "presence_state", (message) => {
    const userList = consolidate(message);
    setState({ presence: message, userList });
  });

  useEvent(channel, "members", (message) => {
    setMembers(message.users);
    // const [onlineList, offlineList] = consolidate(presence, message.users);

    // setState({ presence: message, onlineList, offlineList });
  });

  const consolidate = (newPresence: any): any[] => {
    const result: any[] = [];

    if (members.length === 0) return [];

    members.forEach((member) => {
      if (member.id in newPresence) {
        result.push({ ...member, onlineAt: newPresence[member.id].metas[0].onlineAt });
      } else {
        result.push(member);
      }
    });

    return result;
  };

  return (
    <main className={styles.root}>
      <SideNavigation expand="right" style={{ gridArea: "left" }}>
        <SideNavigationLink to="events">
          <CalendarDaysIcon width="24px" />
          Events
        </SideNavigationLink>
        <SideNavigationLink to="chats">
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
      <SideNavigation expand="left">
        <div className={styles.userList} style={{ flexGrow: 1 }}>
          <h3> <UserCircleIcon width="24px" style={{ overflow: 'visible'}} /> Members</h3>
          {userList.map((user: any) => (
            <UserListCard key={user.id} user={user} online={user.onlineAt} />
          ))}
        </div>
      </SideNavigation>
    </main>
  );
};

export default RootLayout;
