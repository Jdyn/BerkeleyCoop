import styles from "./Chat.module.css";
import useWebsockets from "../../hooks/useWebsocket";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import {
  ArrowSmallRightIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useDimensions from "react-cool-dimensions";
import { HashtagIcon } from "@heroicons/react/20/solid";
import { useUser } from "../../hooks/useUser";

const Chat = () => {
  const params = useParams<{ id: string }>();
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [messages, setMessages] = useState<Record<string, any>[]>([]);
  const { observe, height } = useDimensions();
	const user = useUser();
  const currentRoom = useMemo(() => list.find((room) => room.id == params?.id), [list, params?.id]);
	console.log(user);
  const { channel, connected } = useWebsockets({
    room: params?.id ? `room:${params.id}` : "room:lobby",
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
            <div>
              <HomeIcon width="32px" /> <span>Rooms</span>
            </div>
            <PlusCircleIcon width="32px" />
          </h2>
          {list.map((room) => (
            <Link
              to={`${room.id}`}
              className={clsx(styles.roomItem, room.id == params.id && styles.active)}
              key={room.id}
            >
              <h3>
                <span>
                  <HashtagIcon width="24px" /> {room.name}
                </span>
                <ArrowSmallRightIcon width="24px" />
              </h3>
              <div>{room.description}</div>
            </Link>
          ))}
        </div>
        <div className={styles.window}>
          {currentRoom?.name && (
            <h2 className={styles.windowHeader}>
              <ChatBubbleLeftRightIcon width="32px" /> {currentRoom.name}
            </h2>
          )}
          <div ref={observe} className={styles.chatList} style={{ height: height }}>
            <div className={styles.chatContent}>
              {messages.map((message, index) => (
                <div className={styles.message} key={index}>
                  <span>{message.username}</span>
                  <div className={styles.messageContent}>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            className={styles.inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              const input = document.getElementById("message") as HTMLInputElement;
              channel?.push("shout", { content: input.value });
              input.value = "";
            }}
          >
            <input id="message" className={styles.input} placeholder="Enter a message..." />
            <button title="Send a chat message" className={styles.submit} type="submit">
              <PaperAirplaneIcon width="24px" />
            </button>
          </form>
        </div>
        <div className={styles.list}>
          <h2>
            <div>
              <UserCircleIcon width="32px" /> <span>People</span>
            </div>
          </h2>
          {currentRoom?.users &&
            currentRoom.users.map((user: any) => (
              <div>
                {user.firstName} {user.lastName}
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Chat;
