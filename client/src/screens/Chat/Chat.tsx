import styles from "./Chat.module.css";
import useWebsockets from "../../hooks/useWebsocket";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Chat = () => {
  const params = useParams<{ id: string }>();
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [messages, setMessages] = useState<Record<string, any>[]>([]);

  const { channel, connected } = useWebsockets({
    room: `room:${params.id}` ?? "room:lobby",
    token: JSON.parse(Cookies.get("user") ?? "{}")?.token ?? "",
    onNewMessage: (message) => {
      setMessages((messages) => [...messages, message]);
    },
  });

  useEffect(() => {
    channel?.on("lobby", (payload) => {
      setList(payload.rooms);
    });
    channel?.on("messages", (payload) => {
      setMessages(payload.messages);
    });
  }, [channel, connected]);

  return (
    <>
      <h1>Chat</h1>
      <main className={styles.root}>
        <div className={styles.list}>
          <h2>Rooms</h2>
          {list.map((room) => (
            <Link to={`${room.id}`} className={styles.roomItem} key={room.id}>
              <div>{room.name}</div>
              <div>{room.description}</div>
            </Link>
          ))}
        </div>
        <div className={styles.window}>
          <div className={styles.chatList}>
            {messages.map((message) => (
              <div>{message.content}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
