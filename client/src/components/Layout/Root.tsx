import styles from "./Root.module.css";
import SideNavigation, { SideNavigationLink } from "../SideNavigation/SideNavigation";
import Header from "../Header/Header";
import { Outlet, useParams } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { UserProvider } from "../../hooks/useUser";
import { memo, useEffect, useMemo, useState } from "react";
import useWebsockets from "../../hooks/useWebsocket";
import Cookies from "js-cookie";
import { Presence } from "phoenix";
import UserListCard from "../UserListCard/UserListCard";
import clsx from "clsx";

const RootLayout = memo(() => {
  const params = useParams<{ id: string }>();
  const [members, setMembers] = useState<Record<string, any>[]>([]);
  const [presence, setPresence] = useState<Record<string, any>[]>([]);

  const { channel, connected } = useWebsockets({
    room: params?.id ? `room:${params.id}` : "room:lobby",
    token: JSON.parse(Cookies.get("user") ?? "{}")?.token ?? "",
    onPresenceState: (state) => {
      setPresence(state);
    },
    onPresenceDiff: (diff) => {
      setPresence(Presence.syncState(presence, diff));
    },
  });

  const [onlineList, offlineList] = useMemo(() => {
    const online: any = [];
    const offline: any = [];

    members.forEach((member) => {
      if (member.id in presence) {
        online.push({ ...member, onlineAt: presence[member.id].metas[0].onlineAt });
      } else {
        offline.push(member);
      }
    });

    return [online, offline];
  }, [members, presence]);

  useEffect(() => {
    channel?.on("members", (payload) => {
      setMembers(payload.users);
    });
  }, [channel, connected]);

  return (
    <main className={styles.root}>
      <UserProvider>
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
              signOut();
            }}
            className={clsx(styles.listItem, styles.logout)}
						style={{justifySelf: "flex-end"}}
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
          <div className={styles.userList} style={{ flexGrow: 1}}>
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
      </UserProvider>
    </main>
  );
});

export default RootLayout;
