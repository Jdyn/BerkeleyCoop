import styles from "./Chat.module.css";
import useWebsockets from "../../hooks/useWebsocket";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { ArrowLongRightIcon, HomeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const Chat = () => {
  const params = useParams<{ id: string }>();
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [messages, setMessages] = useState<Record<string, any>[]>([]);
  console.log(messages);

  const { channel, connected } = useWebsockets({
    room: `room:${params?.id}` ?? "room:lobby",
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
          <h2>
            <HomeIcon width="24px" /> Rooms
          </h2>
          {list.map((room) => (
            <Link
              to={`${room.id}`}
              className={clsx(styles.roomItem, room.id == params.id && styles.active)}
              key={room.id}
            >
              <h3>
                {room.name} <ArrowLongRightIcon width="24px" />
              </h3>
              <div>{room.description}</div>
            </Link>
          ))}
        </div>
        <div className={styles.window}>
          <div className={styles.chatList}>
            {messages.map((message, index) => (
              <div className={styles.message} key={index}>
                <h4>{message.user}</h4>
                <div className={styles.messageContent}>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form className={styles.inputForm}>
            <input className={styles.input} placeholder="Enter a message..." />
            <button title="Send a chat message" className={styles.submit} type="submit">
              <PaperAirplaneIcon width="24px" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Chat;
