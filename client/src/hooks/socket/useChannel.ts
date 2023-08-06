import { Channel } from "phoenix";
import { SocketContext } from "./SocketContext";
import { useContext, useEffect, useRef, useState } from "react";

export function useChannel(topic: string, onJoin?: (channel: any, message: any) => void) {
  const socket = useContext(SocketContext);
  const [channel, setChannel] = useState<Channel | null>(null);

  const onJoinFun = useRef(onJoin);
  onJoinFun.current = onJoin;

  useEffect(() => {
    if (socket === null) return;
    // console.log(socket);
    // if (socket.channels?.find((ch: any) => ch.topic === topic)) {
    //   const oldChannel = socket.channels.find((ch: any) => ch.topic === topic);
		// 	setChannel(oldChannel);
    //   oldChannel.push("rejoin", oldChannel.topic);
    //   return;
    // }

    const ch = socket.channel(topic);
    ch.join().receive("ok", (message: any) => onJoinFun?.current && onJoinFun.current(ch, message));
    setChannel(ch);

    return () => {
      ch.leave();
      setChannel(null);
    };
  }, [socket, topic]);

  return channel;
}

function pushPromise(push: any) {
  return new Promise((resolve, reject) => {
    if (!push) {
      return reject("no push");
    }
    push.receive("ok", resolve).receive("error", reject);
  });
}

export function sendMessage(channel: Channel, event: string, payload: any) {
  return pushPromise(channel.push(event, payload));
}
