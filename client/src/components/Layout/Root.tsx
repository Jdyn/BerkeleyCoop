import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import {
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import UserListCard from "../UserListCard/UserListCard";
import { useChannel } from "../../hooks/socket/useChannel";
import useEvent from "../../hooks/socket/useEvent";
import { useEffect, useState } from "react";
import { Presence } from "phoenix";

const RootLayout = () => {
  const channel = useChannel("room:lobby");
  const [members, setMembers] = useState<any[]>([]);
	const [current, setCurrent] = useState<string | undefined>(undefined);

  const [{ presence, userList }, setState] = useState<Record<string, any>>({
    presence: {},
    userList: [],
  });

  useEvent(channel, "presence_diff", (message) => {
    if (Object.keys(presence).length === 0) return;

    const newPresence = Presence.syncDiff(presence, message);
    const userList = consolidate(newPresence);

    setState({ presence: newPresence, userList });
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

  useEffect(() => {
    if (members.length > 0 && Object.keys(presence).length > 0) {
      const userList = consolidate(presence);
      setState({ presence, userList });
    }
  }, [members, presence]);

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
      <SideNavigation expand="right" style={{ gridArea: "left" }} current={current}>
        <SideNavigationLink to="/" onClick={() => setCurrent('0')}>
          <HomeIcon width="24px" />
          Home
        </SideNavigationLink>
        <SideNavigationLink to="/events" onClick={() => setCurrent('1')}>
          <CalendarDaysIcon width="24px" />
          Events
        </SideNavigationLink>
        <SideNavigationLink to="/chats" onClick={() => setCurrent('2')}>
          <ChatBubbleBottomCenterIcon width="24px" />
          Chats
        </SideNavigationLink>
        <div className={styles.logout}>
          <SideNavigationLink
            to="/signin"
            replace
            onClick={() => {
              // signOut();
            }}
            className={styles.listItem}
            style={{ justifySelf: "flex-end" }}
          >
            <ArrowRightOnRectangleIcon width="24px" />
            Log out
          </SideNavigationLink>
        </div>
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
          <h3>
            <UserCircleIcon width="24px" style={{ overflow: "visible" }} /> Members
          </h3>
          {userList.map((user: any) => (
            <UserListCard key={user.id} user={user} online={user.onlineAt} />
          ))}
        </div>
      </SideNavigation>
    </main>
  );
};

export default RootLayout;
