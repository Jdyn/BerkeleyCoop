import styles from "./Chat.module.css";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useCreateRoomMutation, useGetHousesQuery } from "../../api/chat/chat";
import Select from "../../components/Select/Select";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import formStyles from "../../components/Form/index.module.css";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { observe, height } = useDimensions();
  const navigate = useNavigate();
  const modal = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const channel = useChannel(id ? `chat:${id}` : `chat:lobby`);
  const { data } = useGetHousesQuery();
  const [createRoom, { isSuccess }] = useCreateRoomMutation();

  const { control, register, handleSubmit } = useForm<any>();

  const houses = useMemo(
    () => data?.houses?.map((house) => ({ label: house.name, value: house })) ?? [],
    [data]
  );

  const user = useUser();

  useEffect(() => {
    if (isSuccess) navigate("chats");
  }, [isSuccess, navigate]);

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

  const onSubmit = handleSubmit((data) => {
    const payload = {
      room: { ...data, houses: data.houses.map((option: any) => option.value.name) },
    };
    createRoom(payload);
  });

  return (
    <>
      <h1 className={styles.header}>
        Chat
        <Modal
          modal={modal}
          title="Create a new room?"
          description="Publish an event for others to join and participate!"
        >
          <Button>
            <PlusCircleIcon width="20px" /> Create
          </Button>
          <form className={formStyles.form} onSubmit={onSubmit}>
            <fieldset className={formStyles.container}>
              <label>Room name</label>
              <input
                {...register("name")}
                className={formStyles.input}
                type="input"
                placeholder="Enter a name..."
              />
            </fieldset>
            <fieldset className={formStyles.container}>
              <label className={formStyles.label}>Room description</label>
              <input
                {...register("description")}
                className={formStyles.input}
                type="input"
                placeholder="Enter a description..."
              />
            </fieldset>
            <fieldset className={formStyles.container}>
              <label className={formStyles.label}>Invite houses</label>
              <Controller
                control={control}
                defaultValue={[]}
                name="houses"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={(newValue) => {
                      onChange(
                        newValue.filter(
                          (obj, index) =>
                            newValue.findIndex((item) => item.value.id === obj.value.id) === index
                        )
                      );
                    }}
                    options={houses}
                    isMulti
                  />
                )}
              />
            </fieldset>
            <Button type="submit">Create</Button>
          </form>
        </Modal>
      </h1>
      <main className={styles.root}>
        <div className={styles.rooms}>
          <div className={styles.roomHeader}>
            <h2>
              <BuildingStorefrontIcon width="32px" /> <span>Rooms</span>
            </h2>
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
              <div className={styles.houseList} style={{ maxHeight: "50px" }}>
                {room.houses.map((house: any) => (
                  <span className={styles.housePill} key={house.name}>
                    {house.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.window}>
          {currentRoom?.name && (
            <div className={styles.windowHeader}>
              <h2>
                <ChatBubbleLeftRightIcon width="32px" /> {currentRoom.name}
              </h2>
              {
                <div className={clsx(styles.houseList, styles.text)}>
                  {currentRoom.houses?.map((house: any) => (
                    <span className={styles.housePill} key={house.name}>
                      {house.name}
                    </span>
                  ))}
                </div>
              }
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
