import { useState, useEffect } from "react";
import type { Channel } from "phoenix";
import { Socket } from "phoenix";

interface Props {
  room: string;
  token: string;
  onPresenceState?(payload: any): void;
  onPresenceDiff?(payload: any): void;
  onNewMessage(payload: Record<string, any>): void;
}

let socket: Socket;

function useWebsockets({ room, token, onNewMessage, onPresenceState, onPresenceDiff }: Props) {
  const [channel, setChannel] = useState<Channel>();
  const [connected, setConnected] = useState<boolean>(false);

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
        setConnected(false);
        socket.disconnect();
      };
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (socket) {
      const newChannel = socket.channel(room);
      defaultListeners(newChannel);
      setChannel(newChannel);
    }
  }, [room]);

  const defaultListeners = (channel: Channel) => {
    channel
      .join()
      .receive("ok", () => {
        setConnected(true);
      })
      .receive("error", () => {
        setConnected(false);
      });

    channel.on("shout", onNewMessage);

    if (onPresenceState) channel.on("presence_state", onPresenceState);
    if (onPresenceDiff) channel.on("presence_diff", onPresenceDiff);
  };

  return { connected, channel };
}

export default useWebsockets;
