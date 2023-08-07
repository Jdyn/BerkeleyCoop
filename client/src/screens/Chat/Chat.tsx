import styles from "./Chat.module.css";
// import { useChannel } from "../../hooks/useWebsocket";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import {
  ArrowLongRightIcon,
  ArrowSmallRightIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import useDimensions from "react-cool-dimensions";
import { HashtagIcon } from "@heroicons/react/20/solid";
import { useChannel } from "../../hooks/socket/useChannel";
import useEvent from "../../hooks/socket/useEvent";
import { useUser } from "../../hooks/useUser";
import { formatTimeAgo } from "../../util/dates";
import Modal from "../../components/Modal/Modal";
import { useGetHousesQuery } from "../../api/chat/chat";
import Select, { SelectItem } from "../../components/Select/Select";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { observe, height } = useDimensions();
  const modal = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const channel = useChannel(id ? `chat:${id}` : `chat:lobby`);
  const { data } = useGetHousesQuery();

  const user = useUser();

  useEvent(channel, "shout", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  useEvent(channel, "lobby", (message) => {
    setRooms(message.rooms);
  });

  useEvent(channel, "messages", (message) => {
    setMessages(message.messages);
  });

  const currentRoom = useMemo(() => rooms.find((room) => room.id == id), [rooms, id]);

  return (
    <>
      <h1 className={styles.header}>Chat</h1>
      <main className={styles.root}>
        <div className={styles.rooms}>
          <div className={styles.roomHeader}>
            <h2>
              <BuildingStorefrontIcon width="32px" /> <span>Rooms</span>
            </h2>
            <Modal
              modal={modal}
              title="Create a new room?"
              description="Publish an event for others to join and participate!"
            >
              <PlusCircleIcon width="32px" />
              <form>
                <Select>
                  {data?.houses.map((house) => (
                    <SelectItem value={house.id}>{house.title}</SelectItem>
                  ))}
                </Select>
              </form>
            </Modal>
          </div>
          {rooms.map((room) => (
            <Link
              to={`${room.id}`}
              className={clsx(styles.roomItem, room.id == id && styles.active)}
              key={room.id}
            >
              <h3>
                <HashtagIcon width="24px" /> {room.name}
                <ArrowSmallRightIcon width="24px" />
              </h3>
              <p>{room.description}</p>
            </Link>
          ))}
        </div>
        <div className={styles.window}>
          {currentRoom?.name && (
            <div className={styles.windowHeader}>
              <h2>
                <ChatBubbleLeftRightIcon width="32px" /> {currentRoom.name}
              </h2>
              {currentRoom.event && (
                <Link to={`/events/${currentRoom.event?.id}`}>
                  {`This chat has an event: ${currentRoom.event.title}!`}
                  <ArrowLongRightIcon width="24px" />
                </Link>
              )}
            </div>
          )}
          <div ref={observe} className={styles.chatList} style={{ height: height }}>
            <div className={styles.chatContent}>
              {messages.map((message) => (
                <div
                  className={clsx(
                    styles.message,
                    message.user.id === user?.id && styles.ownMessage
                  )}
                  key={message.id}
                >
                  <h4
                    className={styles.messageHeader}
                    style={{
                      flexDirection: message.user.id === user?.id ? "row" : "row-reverse",
                    }}
                  >
                    <div>{formatTimeAgo(message.inserted_at)}</div>
                    <span>{message.username}</span>
                  </h4>
                  <div
                    className={clsx(
                      styles.messageContent,
                      message.user.id === user?.id && styles.selfMessageContent
                    )}
                  >
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
      </main>
    </>
  );
};

export default Chat;
