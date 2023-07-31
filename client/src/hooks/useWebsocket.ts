import { useState, useEffect } from "react";
import type { Channel } from "phoenix";
import { Socket } from "phoenix";

interface Props {
  room: string;
  token: string;
  onPresenceState?(payload: any): void;
  onPresenceDiff?(payload: any): void;
  onNewMessage(payload: any): void;
}

function useWebsockets({ room, token, onNewMessage, onPresenceState, onPresenceDiff }: Props) {
  const [channel, setChannel] = useState<Channel>();
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    if (token && room) {
      const socket = new Socket(`ws://localhost:4000/socket`, {
        params: { token },
        reconnectAfterMs: (_) => 10000,
        rejoinAfterMs: (_) => 10000,
        heartbeatIntervalMs: 10000,
      });

      socket.connect();
      const channel = socket.channel(room);

      setChannel(channel);
      channel
        .join()
        .receive("ok", () => {
          setConnected(true);
        })
        .receive("error", () => {
          setConnected(false);
        });
      channel.on("new_msg", onNewMessage);
      if (onPresenceState) {
        channel.on("presence_state", onPresenceState);
      }
      if (onPresenceDiff) {
        channel.on("presence_diff", onPresenceDiff);
      }

      return () => {
        setConnected(false);
        socket.disconnect();
      };
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (onPresenceState) {
      channel?.off("presence_state");
      channel?.on("presence_state", onPresenceState);
    }
    if (onPresenceDiff) {
      channel?.off("presence_diff");
      channel?.on("presence_diff", onPresenceDiff);
    }
    channel?.off("new_msg");
    channel?.on("new_msg", onNewMessage);
  }, [room, onNewMessage, onPresenceState, onPresenceDiff]);

  return { connected, channel };
}

export default useWebsockets;
