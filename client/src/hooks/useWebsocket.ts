import { useState, useEffect, createContext } from "react";
import type { Channel } from "phoenix";
import { Presence, Socket } from "phoenix";
import { useContext } from "react";

interface Props {
  room: string;
  token: string;
}

let socket: Socket;

// const channelContext = createContext<{
//   channel: Channel | undefined;
//   rooms: any[];
//   messages: any[];
// }>({
//   channel: undefined,
//   rooms: [],
//   messages: [],
// });

// export const ChannelProvider = channelContext.Provider;

// export const useChannel = () => {
//   const channel = useContext(channelContext);
//   // if (!channel) throw new Error("useChannel must be used within a ChannelProvider");

//   return channel;
// };

function useWebsockets({ room, token }: Props) {
  const [channel, setChannel] = useState<Channel>();
  // const [rooms, setRooms] = useState<Record<string, any>[]>([]);
  // const [messages, setMessages] = useState<Record<string, any>[]>([]);
  // const [members, setMembers] = useState<Record<string, any>[]>([]);
  const [presence, setPresence] = useState<Record<string, any>>({});

  useEffect(() => {
    if (token) {
      socket = new Socket(`ws://localhost:4000/socket`, {
        params: { token },
        reconnectAfterMs: (_) => 10000,
        rejoinAfterMs: (_) => 10000,
        heartbeatIntervalMs: 10000,
      });

      socket.connect();

      return () => {
        socket.disconnect();
      };
    }

    return () => {};
  }, []);

  useEffect(() => {
    const defaultListeners = (channel: Channel) => {
      channel.join();

      // channel.on("lobby", (payload) => setRooms(payload.rooms));
      // channel.on("messages", (payload) => setMessages(payload.messages));
      // channel.on("shout", (message) => setMessages((prev) => [...prev, message]));

      channel.on("presence_state", (payload) => {
        setPresence((prev) => {
          const res = Presence.syncState(prev, payload);
          if (prev !== res) return res;
        });
      });

      channel.on("presence_diff", (payload) => {
        setPresence((prev) => {
					// console.log(prev)
					// console.log(payload)
					// console.log(Presence.syncDiff(prev, payload))
          return Presence.syncDiff(prev, payload);
        });
      });

      // channel.on("members", (payload) => {
      //   setMembers(payload.users);
      // });
    };

    if (socket) {
      const newChannel = socket.channel(room);
      defaultListeners(newChannel);
      setChannel(newChannel);
    }
  }, [room]);

  // useEffect(() => {
  //   channel?.off("presence_state");
  //   channel?.on("presence_state", onPresenceState);

  //   channel?.off("presence_diff");
  //   channel?.on("presence_diff", onPresenceDiff);

  //   channel?.off("new_msg");
  //   channel?.on("new_msg", onNewMessage);
  // }, [room]);

  // const [onlineList, offlineList] = (() => {
  //   const online: any = [];
  //   const offline: any = [];

  //   members.forEach((member) => {
  //     if (member.id in presence) {
  //       online.push({ ...member, onlineAt: presence[member.id].metas[0].onlineAt });
  //     } else {
  //       offline.push(member);
  //     }
  //   });

  //   return [online, offline];
  // })();

  return { channel, onlineList: [], offlineList: [], presence };
}

export default useWebsockets;
